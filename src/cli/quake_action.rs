use std::error::Error;
use std::fs;
use std::path::PathBuf;

use tracing::info;
use walkdir::{DirEntry, FilterEntry, IntoIter, WalkDir};

use quake_core::entry::entry_defines::EntryDefines;
use quake_core::entry::entry_paths::EntryPaths;
use quake_core::errors::QuakeError;
use quake_core::usecases::entry_usecases;
use quake_core::usecases::entrysets::Entrysets;
use quake_core::QuakeConfig;

use crate::helper::exec_wrapper::meili_exec;
use crate::usecases::reference_usecases::create_entries_refs;

pub enum QuakeAction {
    Sync,
    Migration,
    Feed,
    Refs,
    Error,
}

impl QuakeAction {
    pub fn from(text: &str) -> QuakeAction {
        match text {
            "sync" => QuakeAction::Sync,
            "migration" => QuakeAction::Migration,
            "feed" => QuakeAction::Feed,
            "refs" => QuakeAction::Refs,
            _ => QuakeAction::Error,
        }
    }
}

pub fn quake_action(action: String, conf: &QuakeConfig) -> Result<(), Box<dyn Error>> {
    match QuakeAction::from(action.as_str()) {
        QuakeAction::Sync => {
            sync_defines(conf)?;
        }
        QuakeAction::Migration => {}
        QuakeAction::Feed => {
            feed_data(conf)?;
        }
        QuakeAction::Refs => {
            let path = PathBuf::from(&conf.workspace);
            create_entries_refs(&path)?;
        }
        QuakeAction::Error => {
            return Err(Box::new(QuakeError(format!(
                "unknown quake action: {:?}",
                action
            ))))
        }
    }

    Ok(())
}

pub fn is_hidden(entry: &DirEntry) -> bool {
    entry
        .file_name()
        .to_str()
        .map(|s| s.starts_with('.'))
        .unwrap_or(false)
}

fn feed_data(conf: &QuakeConfig) -> Result<(), Box<dyn Error>> {
    let path = PathBuf::from(&conf.workspace);
    let temp_file = "dump.json";

    let defines = EntryDefines::from_path(&path.join(EntryPaths::entries_define()));

    for entry in walk_in_path(path) {
        let entry = entry.unwrap();
        if !entry.path().is_dir() {
            continue;
        }

        let table = entry.path().join(EntryPaths::entries_csv());
        if !table.exists() {
            continue;
        }

        #[allow(clippy::useless_format)]
        let entry_type = format!("{:}", entry.path().file_name().unwrap().to_str().unwrap());

        let paths = EntryPaths::init(&conf.workspace, &entry_type);
        let define = defines
            .find(&entry_type)
            .unwrap_or_else(|| panic!("lost entry define for: {:?}", &entry_type));

        let map = Entrysets::jsonify_with_format_date(&paths.entry_path, &define)?.to_string();
        fs::write(temp_file, map)?;

        meili_exec::feed_documents(&conf.search_url, &entry_type)?;
        meili_exec::feed_settings(&conf.search_url, &define)?;

        info!("done '{:}' feed", &entry_type);
    }

    fs::remove_file(temp_file)?;

    Ok(())
}

fn sync_defines(conf: &QuakeConfig) -> Result<(), Box<dyn Error>> {
    let path = PathBuf::from(&conf.workspace);

    let mut define_file = EntryDefines::default();
    for entry in walk_in_path(path) {
        let entry = entry.unwrap();
        if !entry.path().is_dir() {
            continue;
        }

        let path_name = entry
            .path()
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .to_string();
        if path_name.eq(&conf.server_location) {
            continue;
        }

        let paths = EntryPaths::init(&conf.workspace, &path_name);
        entry_usecases::sync_in_path(&paths)?;

        let csv = entry.path().join(EntryPaths::entries_csv());
        if csv.exists() {
            define_file
                .entries
                .push(Entrysets::define_from_csv(path_name, csv)?);
        }
    }

    let content = serde_yaml::to_string(&define_file).unwrap();
    fs::write(
        PathBuf::from(&conf.workspace).join("entries-define.yaml"),
        content,
    )?;

    Ok(())
}

fn walk_in_path(path: PathBuf) -> FilterEntry<IntoIter, fn(&DirEntry) -> bool> {
    WalkDir::new(path)
        .min_depth(1)
        .max_depth(1)
        .into_iter()
        .filter_entry(|e| !is_hidden(e))
}

/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ActionDefine } from "./components/quake-dashboard/quake-dashboard";
import { Layout } from "./components/simple-layout/simple-layout";
export namespace Components {
    interface EntryCard {
        "fileProp": number;
        "item": any;
        "type": string;
    }
    interface EntryList {
    }
    interface FetchApi {
        "entryType": string[];
        "searchEngine": boolean;
        "type": string;
    }
    interface QuakeDashboard {
        "indexName": string;
    }
    interface SimpleLayout {
        "layout": Layout;
    }
}
declare global {
    interface HTMLEntryCardElement extends Components.EntryCard, HTMLStencilElement {
    }
    var HTMLEntryCardElement: {
        prototype: HTMLEntryCardElement;
        new (): HTMLEntryCardElement;
    };
    interface HTMLEntryListElement extends Components.EntryList, HTMLStencilElement {
    }
    var HTMLEntryListElement: {
        prototype: HTMLEntryListElement;
        new (): HTMLEntryListElement;
    };
    interface HTMLFetchApiElement extends Components.FetchApi, HTMLStencilElement {
    }
    var HTMLFetchApiElement: {
        prototype: HTMLFetchApiElement;
        new (): HTMLFetchApiElement;
    };
    interface HTMLQuakeDashboardElement extends Components.QuakeDashboard, HTMLStencilElement {
    }
    var HTMLQuakeDashboardElement: {
        prototype: HTMLQuakeDashboardElement;
        new (): HTMLQuakeDashboardElement;
    };
    interface HTMLSimpleLayoutElement extends Components.SimpleLayout, HTMLStencilElement {
    }
    var HTMLSimpleLayoutElement: {
        prototype: HTMLSimpleLayoutElement;
        new (): HTMLSimpleLayoutElement;
    };
    interface HTMLElementTagNameMap {
        "entry-card": HTMLEntryCardElement;
        "entry-list": HTMLEntryListElement;
        "fetch-api": HTMLFetchApiElement;
        "quake-dashboard": HTMLQuakeDashboardElement;
        "simple-layout": HTMLSimpleLayoutElement;
    }
}
declare namespace LocalJSX {
    interface EntryCard {
        "fileProp"?: number;
        "item"?: any;
        "type"?: string;
    }
    interface EntryList {
    }
    interface FetchApi {
        "entryType"?: string[];
        "onFetchAllSuccess"?: (event: CustomEvent<any>) => void;
        "onFetchSuccess"?: (event: CustomEvent<any>) => void;
        "searchEngine"?: boolean;
        "type"?: string;
    }
    interface QuakeDashboard {
        "indexName"?: string;
        "onDispatchAction"?: (event: CustomEvent<ActionDefine>) => void;
    }
    interface SimpleLayout {
        "layout"?: Layout;
    }
    interface IntrinsicElements {
        "entry-card": EntryCard;
        "entry-list": EntryList;
        "fetch-api": FetchApi;
        "quake-dashboard": QuakeDashboard;
        "simple-layout": SimpleLayout;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "entry-card": LocalJSX.EntryCard & JSXBase.HTMLAttributes<HTMLEntryCardElement>;
            "entry-list": LocalJSX.EntryList & JSXBase.HTMLAttributes<HTMLEntryListElement>;
            "fetch-api": LocalJSX.FetchApi & JSXBase.HTMLAttributes<HTMLFetchApiElement>;
            "quake-dashboard": LocalJSX.QuakeDashboard & JSXBase.HTMLAttributes<HTMLQuakeDashboardElement>;
            "simple-layout": LocalJSX.SimpleLayout & JSXBase.HTMLAttributes<HTMLSimpleLayoutElement>;
        }
    }
}

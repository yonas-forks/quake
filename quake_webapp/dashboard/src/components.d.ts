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
    interface FetchApi {
        "data": any;
        "entryType": String[];
        "searchEngine": boolean;
        "type": String;
    }
    interface FlowView {
    }
    interface QuakeDashboard {
        "indexName": string;
    }
    interface SimpleLayout {
        "layout": Layout;
    }
}
declare global {
    interface HTMLFetchApiElement extends Components.FetchApi, HTMLStencilElement {
    }
    var HTMLFetchApiElement: {
        prototype: HTMLFetchApiElement;
        new (): HTMLFetchApiElement;
    };
    interface HTMLFlowViewElement extends Components.FlowView, HTMLStencilElement {
    }
    var HTMLFlowViewElement: {
        prototype: HTMLFlowViewElement;
        new (): HTMLFlowViewElement;
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
        "fetch-api": HTMLFetchApiElement;
        "flow-view": HTMLFlowViewElement;
        "quake-dashboard": HTMLQuakeDashboardElement;
        "simple-layout": HTMLSimpleLayoutElement;
    }
}
declare namespace LocalJSX {
    interface FetchApi {
        "data"?: any;
        "entryType"?: String[];
        "onFetchAllSuccess"?: (event: CustomEvent<any>) => void;
        "onFetchNextSuccess"?: (event: CustomEvent<any>) => void;
        "searchEngine"?: boolean;
        "type"?: String;
    }
    interface FlowView {
    }
    interface QuakeDashboard {
        "indexName"?: string;
        "onDispatchAction"?: (event: CustomEvent<ActionDefine>) => void;
    }
    interface SimpleLayout {
        "layout"?: Layout;
    }
    interface IntrinsicElements {
        "fetch-api": FetchApi;
        "flow-view": FlowView;
        "quake-dashboard": QuakeDashboard;
        "simple-layout": SimpleLayout;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "fetch-api": LocalJSX.FetchApi & JSXBase.HTMLAttributes<HTMLFetchApiElement>;
            "flow-view": LocalJSX.FlowView & JSXBase.HTMLAttributes<HTMLFlowViewElement>;
            "quake-dashboard": LocalJSX.QuakeDashboard & JSXBase.HTMLAttributes<HTMLQuakeDashboardElement>;
            "simple-layout": LocalJSX.SimpleLayout & JSXBase.HTMLAttributes<HTMLSimpleLayoutElement>;
        }
    }
}

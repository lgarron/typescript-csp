import { HashSource, HTTPTokenString, MimeTypeString, NonceSource } from "./string-sources";
import { allow, allow_duplicates, block, none, script, self, strict_dynamic, unquoted_script, unquoted_style, unsafe_hashes, unsafe_inline, wildcard } from "./tokens";
import { HostURLSource, SchemeURLSource, URIReference, URLSource } from "./url-sources";

type ScriptSourceCommon = strict_dynamic | unsafe_hashes | HashSource | NonceSource | HashSource | URLSource

// For directives that take no values (e.g. `upgrade-insecure-requests`)
export class EmptyValue { #unique: true; toString(): string { return ""; } }

type URLish = (self | URLSource)[] | none

type ToStringable = {
  toString(): string
}

export class DeprecatedButImplemented<T extends ToStringable> {
  #unique: true;
  constructor(public value: T) {}
  toString(): string { return this.value.toString(); }
}

export class DeprecatedAndUnimplemented<T extends ToStringable> {
  #unique: true;
  constructor(public value: T) {}
  toString(): string { return this.value.toString(); }
}

// Array entries
type Arr<T extends any[]> = T extends (infer U)[] ? U : never;
// Directive
type D<T extends keyof CSP> = Exclude<Required<CSP>[T], none>;

export interface CSP {

  /**************** Built into the CSP spec ****************/

  // TODO: can default-src (usefully) contain anything from any other directive, or are there limits?
  "default-src"?: (self | URLSource | Arr<D<"script-src">>)[] | none;

  // Fetch directives
  // https://w3c.github.io/webappsec-csp/#directives-fetch
  "child-src"?: URLish
  "connect-src"?: URLish,
  "font-src"?: URLish,
  "frame-src"?: URLish,
  "img-src"?: URLish,
  "manifest-src"?: URLish,
  "media-src"?: URLish,
  "object-src"?: URLish,
  "script-src"?:
  // TODO: can we get `'default-src'` to inherit the exclusive alternatives properly?
  | (ScriptSourceCommon | unsafe_inline | self)[]
  | (ScriptSourceCommon | strict_dynamic)[] // `'strict-dynamic'` overrules `'unsafe-inline'` and `'self'` https://w3c.github.io/webappsec-csp/#strict-dynamic-usage
  | none;
  "script-src-elem"?: D<"script-src">, // TODO
  "script-src-attr"?: D<"script-src">, // TODO
  "style-src"?: (unsafe_inline | NonceSource | HashSource | self | URLSource)[] | none,
  "style-src-elem"?: D<"style-src">, // TOD
  "style-src-attr"?: D<"style-src">, // TODO

  // "Other Directives"
  // https://w3c.github.io/webappsec-csp/#directives-other
  "webrtc"?: allow | block;
  "worker-src"?: URLish,

  // Document directives
  // https://w3c.github.io/webappsec-csp/#directives-document
  "base-uri"?: URLish
  "sandbox"?: HTTPTokenString[],

  // Navigation Directives
  // https://w3c.github.io/webappsec-csp/#directives-navigation
  "form-action"?: URLish,
  // https://w3c.github.io/webappsec-csp/#directive-frame-ancestors
  "frame-ancestors"?: (SchemeURLSource | HostURLSource | self)[] | none;

  // Reporting Directives
  // https://w3c.github.io/webappsec-csp/#directives-reporting
  // https://w3c.github.io/webappsec-csp/#directive-report-uri
  "report-uri"?: DeprecatedButImplemented<URIReference[]>,
  // Group name for the `Reporting-Endpoints` header: https://w3c.github.io/reporting/
  "report-to"?: HTTPTokenString,

  /**************** Defined in other specs ****************/

  // Upgrade Insecure Requests
  // https://www.w3.org/TR/upgrade-insecure-requests/#delivery
  "upgrade-insecure-requests"?: EmptyValue,

  // Trusted Types
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
  // https://w3c.github.io/trusted-types/dist/spec/
  "require-trusted-types-for"?: script
  // https://w3c.github.io/trusted-types/dist/spec/#trusted-types-csp-directive
  "trusted-types"?: (allow_duplicates | wildcard)[]

  /**************** Deprecated ****************/

  // https://chromestatus.com/feature/6457580339593216
  "navigate-to"?: DeprecatedAndUnimplemented<URLish>,
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/plugin-types
  // Only implemented in Safari
  "plugin-types"?: DeprecatedAndUnimplemented<MimeTypeString[]>,

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/prefetch-src
  "prefetch-src"?: DeprecatedAndUnimplemented<URLish>,
  
  // CSP referrer policy
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/referrer
  // Deprecated in favor of the `Referrer-Policy` header instead: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  "referrer"?: DeprecatedAndUnimplemented<"no-referrer" | "none-when-downgrade" | "origin" | "origin-when-cross-origin" | "origin-when-crossorigin" | "unsafe-url">,

  // Subresource Integrity (SRI)
  // https://github.com/w3c/webappsec-subresource-integrity/blob/4bd1c0346eb3ede5b8b97b301bc58459f3346203/index.bs#L371
  // Removed in 2016: https://bugs.chromium.org/p/chromium/issues/detail?id=618924#c16
  "require-sri-for"?: DeprecatedAndUnimplemented<(unquoted_script | unquoted_style)[]>

  // Mixed Content
  // https://www.w3.org/TR/mixed-content/
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/block-all-mixed-content
  "block-all-mixed-content"?: DeprecatedButImplemented<EmptyValue>,
}

export function serializeCSP(csp: CSP): string {
  return Object.entries(csp).map((entry) => {
    const [directive, valueSource] = entry as [string, ToStringable | ToStringable[]];
    let arr = [directive]
    if (valueSource instanceof Array) {
      arr = arr.concat(valueSource.map(v => v.toString()))
    } else {
      arr.push( valueSource.toString())
    }
    return arr.filter(value => value !== "").join(" ");
  }).join("; ")
}

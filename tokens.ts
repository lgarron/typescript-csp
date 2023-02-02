// Keyword Source Tokens
export type none = "'none'";
export type report_sample = "'report-sample'";
export type self = "'self'";
export type unsafe_allow_redirects = "'unsafe-allow-redirects'";
export type unsafe_eval = "'unsafe-eval'";
export type unsafe_inline = "'unsafe-inline'";
export type wasm_unsafe_eval = "'wasm-unsafe-eval'";
// `script-src`
export type strict_dynamic = "'strict-dynamic'"; // https://w3c.github.io/webappsec-csp/#strict-dynamic-usage
export type unsafe_hashes = "'unsafe-hashes'"; // https://w3c.github.io/webappsec-csp/#unsafe-hashes-usage
// `webrtc`
// https://w3c.github.io/webappsec-csp/#directive-webrtc
export type allow = "'allow'";
export type block = "'block'";

// Directive name tokens
export type script = "'script'"

// Subresource Integrity (SRI)
export type unquoted_script = "script"
export type unquoted_style = "style"

// Trusted Types
export type allow_duplicates = 'allow-duplicates'
export type wildcard = "*"

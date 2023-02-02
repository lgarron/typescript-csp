
export class UnquotedStringSource {
	constructor(public value: string) {}
	toString(): string { return this.value; }
}

export class SingleQuotedStringSource {
	constructor(public value: string) {}
	toString(): string { return this.value; }
}

// `'script-src'`
export class NonceSource extends SingleQuotedStringSource { #unique: true }
export class HashSourceSHA256 extends SingleQuotedStringSource { #unique: true }
export class HashSourceSHA384 extends SingleQuotedStringSource { #unique: true; }
export class HashSourceSHA512 extends SingleQuotedStringSource { #unique: true }
export type HashSource = HashSourceSHA256 | HashSourceSHA384 | HashSourceSHA512

// https://w3c.github.io/webappsec-csp/#directive-sandbox
// https://www.rfc-editor.org/rfc/rfc9110#section-5.6.2
// token = 1*tchar
// tchar = "!" / "#" / "$" / "%" / "&" / "'" / "*"
//       / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
//       / DIGIT / ALPHA
//       ; any VCHAR, except delimiter
export class HTTPTokenString extends UnquotedStringSource { #unique: true }

// Trusted Types
// https://w3c.github.io/trusted-types/dist/spec/#tt-policy-name
// tt-policy-name = 1*( ALPHA / DIGIT / "-" / "#" / "=" / "_" / "/" / "@" / "." / "%")
export class TrustedTypesPolicyName extends UnquotedStringSource { #unique: true }

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/plugin-types#syntax
export class MimeTypeString extends UnquotedStringSource { #unique: true }

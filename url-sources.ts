
export class URLSourceBaseClass {
	constructor(public value: string) {}
}

export class SchemeURLSource extends URLSourceBaseClass { #unique: true }
export class HostURLSource extends URLSourceBaseClass { #unique: true }
export class OtherURLSource extends URLSourceBaseClass { #unique: true } // TODO

export type URLSource = SchemeURLSource | HostURLSource | OtherURLSource

// https://www.rfc-editor.org/rfc/rfc3986#section-4.1
export class URIReference extends URLSourceBaseClass { #unique: true }


export class URLSourceBaseClass {
	constructor(public value: string) {}
  toString(): string {
    return this.value;
  }
}

export class SchemeURLSource extends URLSourceBaseClass {
  #unique: true;
  constructor(s: string) {
    super(s);
    // TODO: wildcards?
    if (new URL(s).protocol !== s) {
      throw new Error(`Invalid scheme name source: ${s}`);
    }
  }
}
export class HostURLSource extends URLSourceBaseClass {
  #unique: true;
  constructor(s: string) {
    super(s);
    if (new URL("https://" + s).hostname !== s) {
      throw new Error(`Invalid host name source: ${s}`);
    }
  }
}
export class WildcardHostURLSource extends URLSourceBaseClass {
  #unique: true;
  constructor(s: string) {
    super(s);
    const starHostName = s.replaceAll("*", "_star_")
    if (!s.includes("*.") || new URL("https://" + starHostName).hostname !== starHostName) {
      throw new Error(`Invalid wildcard host name source: ${s}`);
    }
  }
}
export class OtherURLSource extends URLSourceBaseClass { #unique: true } // TODO

export type URLSource = SchemeURLSource | HostURLSource | WildcardHostURLSource | OtherURLSource

// https://www.rfc-editor.org/rfc/rfc3986#section-4.1
export class URIReference extends URLSourceBaseClass { #unique: true }

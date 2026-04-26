## GPX parsing

Current implementation uses XDocument.

Pros:
- simple
- easy to read
- good for v1

Cons:
- loads entire XML into memory
- may be inefficient for large GPX files

Possible improvement:
- streaming parser with XmlReader
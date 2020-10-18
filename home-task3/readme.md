### Create an encryption/decryption utility to protect text files

Home task 2

Write a utility which will have the following features:

- could encrypt text files (assume "utf-8" encoding)
- encrypted text files could replace the originals at the same directory or be near the originals (make a flag to control this)
- you could pass a glob pattern as an argument to select which files you want to encrypt
- you could pass an argument to exclude some files by glob pattern 
- you could pass an argument to exclude files by extension 
- you could select any other directory with argument, in this case this new directory will contain only encrypted files.
- you could select with argument an extension of encrypted files.
- encryption key should not be hardcoded, it should be available to pass it as an argument.
- additional flag to make it possible create a zip archive from all encrypted files
- it should be possible to decrypt your files (decrypt flag, same functionalities described above are supported (decrypt whole folder/zip archive))

More advanced features:
- Make it possible to upload zip archive with flag to google drive (additional logic could be needed to pass the key)

Requirements:
- project should be written in Typescript
- all features should be covered with unit tests
- linter should be added, airbnb style is recommended, though feel free to customize into your needs
- all workflows described with scripts in `package.json`
- scripts supported include (unit tests coverage report, linting, build the project from typescript to js etc).
- added cold reloading (refer to nodemon workshop)
- all logic is described in separate files (keep a modular structure)
- the part which does encoding/decoding should be isolated from arguments parsing,
so in case the project is built and then imported in another location (you could refer to `yarn link` material), it is possible to reuse it, e.g:
```typescript
import { encode, decode } from "texts-protector";

encode(encodeArgument1, encodeArgument2, etc);

decode(decodeArgument1, decodeArgument2, etc)

// or :
import { protect } from "texts-protector";
 
protect(allArgumentsObject)
```

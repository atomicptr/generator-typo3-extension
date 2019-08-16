# Yeoman generator for TYPO3 extensions

Opinionated generator for TYPO3 Extensions

## Install

1. You need to have node.js / npm installed - https://nodejs.org/
2. Install yeoman and the TYPO3 extension generator:

```bash
$ npm install -g yo generator-typo3-extension
```

3. Generate your extension!

```bash
$ yo typo3-extension

? What is your extension vendor name? MyVendor
? What is your extension key? my_extension_key
? What is your name? Chuck Tester
? What is your email? chuck@tester.com

Generating extension files...
   create my_extension_key/.gitignore
   create my_extension_key/composer.json
   create my_extension_key/ext_emconf.php
   create my_extension_key/ext_localconf.php
   create my_extension_key/ext_tables.php
   create my_extension_key/README.md
   create my_extension_key/typoscript-lint.yml
   create my_extension_key/Classes/Controller/ExampleController.php
   create my_extension_key/Classes/Controller/ExampleBackendController.php
   create my_extension_key/Configuration/TCA/Overrides/pages.php
   create my_extension_key/Configuration/TSconfig/pagets.tsconfig
   create my_extension_key/Configuration/TypoScript/setup.typoscript
   create my_extension_key/Configuration/TypoScript/constants.typoscript
   create my_extension_key/Resources/Private/Language/locallang_module.xlf
   create my_extension_key/Resources/Private/Layouts/Backend.html
   create my_extension_key/Resources/Private/Layouts/Default.html
   create my_extension_key/Resources/Private/Templates/Example/List.html
   create my_extension_key/Resources/Private/Templates/ExampleBackend/List.html
   create my_extension_key/Tests/Unit/Controller/ExampleControllerTest.php
```

## License

MIT
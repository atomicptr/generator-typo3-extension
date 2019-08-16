const path = require("path");

const Generator = require("yeoman-generator");

const NameUtility = require("./utility/NameUtility");

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    async prompting() {

        this.answers = await this.prompt([
            {
                type: "input",
                name: "vendorName",
                message: "What is your extension vendor name?",
                default: "MyCompany",
                validate: value => (/^[A-Z][a-zA-Z0-9]*$/g).test(value),
                store: true
            },
            {
                type: "input",
                name: "extensionKey",
                message: "What is your extension key?",
                default: "my_custom_extension",
                validate: value => (/^[a-z0-9]+(\_[a-z0-9]+)*$/g).test(value)
            },
            {
                type: "input",
                name: "authorName",
                message: "What is your name?",
                default: this.user.git.name
            },
            {
                type: "input",
                name: "authorEmail",
                message: "What is your email?",
                default: this.user.git.email,
                validate: value => (/^.+\@.+\..+$/g).test(value)
            }
        ]);
    }

    writing() {
        this.log("Generating extension files...");

        const {
            vendorName,
            extensionKey,
            authorName,
            authorEmail
        } = this.answers;

        const rootDir = this.destinationPath(extensionKey);
        const classesDir = path.join(rootDir, "Classes");
        const configurationDir = path.join(rootDir, "Configuration");
        const privateResourcesDir = path.join(rootDir, "Resources", "Private");
        const testsDir = path.join(rootDir, "Tests", "Unit");

        const phpVendorName = NameUtility.generateUpperCamelCaseName(vendorName);
        const phpExtensionName = NameUtility.generateUpperCamelCaseName(extensionKey);

        const templateVariables = {
            authorName,
            authorEmail,
            composerVendorName: NameUtility.composerFriendlyName(vendorName),
            composerExtensionKey: NameUtility.composerFriendlyName(extensionKey),
            extensionKey,
            extensionKeyCondensed: NameUtility.condenseExtensionKey(extensionKey),
            extensionName: NameUtility.generateProperNameFromExtensionKey(extensionKey),
            phpVendorName,
            phpExtensionName
        };

        // Root Dir
        this.fs.copy(
            this.templatePath("_.gitignore"),
            path.join(rootDir, ".gitignore"),
        );
        this.fs.copyTpl(
            this.templatePath("_composer.json"),
            path.join(rootDir, "composer.json"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("_ext_emconf.php"),
            path.join(rootDir, "ext_emconf.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("_ext_localconf.php"),
            path.join(rootDir, "ext_localconf.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("_ext_tables.php"),
            path.join(rootDir, "ext_tables.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("_README.md"),
            path.join(rootDir, "README.md"),
            templateVariables
        );
        this.fs.copy(
            this.templatePath("_typoscript-lint.yml"),
            path.join(rootDir, "typoscript-lint.yml"),
        );

        // Classes
        // Classes/Controller
        this.fs.copyTpl(
            this.templatePath("Classes/Controller/_ExampleController.php"),
            path.join(classesDir, "Controller", "ExampleController.php"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("Classes/Controller/_ExampleBackendController.php"),
            path.join(classesDir, "Controller", "ExampleBackendController.php"),
            templateVariables
        );

        // Configuration
        // Configuration/TCA/Overrides
        this.fs.copyTpl(
            this.templatePath("Configuration/TCA/Overrides/_pages.php"),
            path.join(configurationDir, "TCA", "Overrides","pages.php"),
            templateVariables
        );
        // Configuration/TSconfig
        this.fs.copyTpl(
            this.templatePath("Configuration/TSconfig/_wizard.tsconfig"),
            path.join(configurationDir, "TSconfig", "wizard.tsconfig"),
            templateVariables
        );
        // Configuration/TypoScript
        this.fs.copyTpl(
            this.templatePath("Configuration/TypoScript/_setup.typoscript"),
            path.join(configurationDir, "TypoScript", "setup.typoscript"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("Configuration/TypoScript/_constants.typoscript"),
            path.join(configurationDir, "TypoScript", "constants.typoscript"),
            templateVariables
        );

        // Resources
        // Resources/Language
        this.fs.copyTpl(
            this.templatePath("Resources/Private/Language/_locallang_module.xlf"),
            path.join(privateResourcesDir, "Language", "locallang_module.xlf"),
            templateVariables
        );
        this.fs.copyTpl(
            this.templatePath("Resources/Private/Language/_locallang_plugins.xlf"),
            path.join(privateResourcesDir, "Language", "locallang_plugins.xlf"),
            templateVariables
        );
        // Resources/Private/Layouts
        this.fs.copy(
            this.templatePath("Resources/Private/Layouts/_Backend.html"),
            path.join(privateResourcesDir, "Layouts", "Backend.html")
        );
        this.fs.copy(
            this.templatePath("Resources/Private/Layouts/_Default.html"),
            path.join(privateResourcesDir, "Layouts", "Default.html")
        );
        // Resources/Private/Templates
        this.fs.copy(
            this.templatePath("Resources/Private/Templates/Example/_List.html"),
            path.join(privateResourcesDir, "Templates", "Example", "List.html")
        );
        this.fs.copy(
            this.templatePath("Resources/Private/Templates/ExampleBackend/_List.html"),
            path.join(privateResourcesDir, "Templates", "ExampleBackend", "List.html")
        );

        // Tests
        // Tests/Unit/Controller
        this.fs.copyTpl(
            this.templatePath("Tests/Unit/Controller/_ExampleControllerTest.php"),
            path.join(testsDir, "Controller", "ExampleControllerTest.php"),
            templateVariables
        );
    }
}
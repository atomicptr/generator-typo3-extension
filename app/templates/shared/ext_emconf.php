<?php

$EM_CONF["<%= extensionKey %>"] = [
    "title" => "<%= extensionName %>",
    "description" => "<%= extensionName %> is a TYPO3 extension!",
    "category" => "<%= extensionCategory %>",
    "author" => "<%= authorName %>",
    "author_email" => "<%= authorEmail %>",
    "state" => "stable",
    "version" => "1.0.0",
    "constraints" => [
        "depends" => [
            "typo3" => "9.5.0-9.5.99"
        ],
        "conflicts" => [],
        "suggests" => [],
    ]
];
<?php

// This file has been auto-generated by the Symfony Routing Component.

return [
    '_preview_error' => [['code', '_format'], ['_controller' => 'error_controller::preview', '_format' => 'html'], ['code' => '\\d+'], [['variable', '.', '[^/]++', '_format'], ['variable', '/', '\\d+', 'code'], ['text', '/_error']], [], []],
    '_wdt' => [['token'], ['_controller' => 'web_profiler.controller.profiler::toolbarAction'], [], [['variable', '/', '[^/]++', 'token'], ['text', '/_wdt']], [], []],
    '_profiler_home' => [[], ['_controller' => 'web_profiler.controller.profiler::homeAction'], [], [['text', '/_profiler/']], [], []],
    '_profiler_search' => [[], ['_controller' => 'web_profiler.controller.profiler::searchAction'], [], [['text', '/_profiler/search']], [], []],
    '_profiler_search_bar' => [[], ['_controller' => 'web_profiler.controller.profiler::searchBarAction'], [], [['text', '/_profiler/search_bar']], [], []],
    '_profiler_phpinfo' => [[], ['_controller' => 'web_profiler.controller.profiler::phpinfoAction'], [], [['text', '/_profiler/phpinfo']], [], []],
    '_profiler_search_results' => [['token'], ['_controller' => 'web_profiler.controller.profiler::searchResultsAction'], [], [['text', '/search/results'], ['variable', '/', '[^/]++', 'token'], ['text', '/_profiler']], [], []],
    '_profiler_open_file' => [[], ['_controller' => 'web_profiler.controller.profiler::openAction'], [], [['text', '/_profiler/open']], [], []],
    '_profiler' => [['token'], ['_controller' => 'web_profiler.controller.profiler::panelAction'], [], [['variable', '/', '[^/]++', 'token'], ['text', '/_profiler']], [], []],
    '_profiler_router' => [['token'], ['_controller' => 'web_profiler.controller.router::panelAction'], [], [['text', '/router'], ['variable', '/', '[^/]++', 'token'], ['text', '/_profiler']], [], []],
    '_profiler_exception' => [['token'], ['_controller' => 'web_profiler.controller.exception_panel::body'], [], [['text', '/exception'], ['variable', '/', '[^/]++', 'token'], ['text', '/_profiler']], [], []],
    '_profiler_exception_css' => [['token'], ['_controller' => 'web_profiler.controller.exception_panel::stylesheet'], [], [['text', '/exception.css'], ['variable', '/', '[^/]++', 'token'], ['text', '/_profiler']], [], []],
    'api_get_client_liste' => [[], ['_controller' => 'App\\Controller\\APIController::liste'], [], [['text', '/api/client/liste']], [], []],
    'api_get_client_id' => [['id'], ['_controller' => 'App\\Controller\\APIController::clientById'], [], [['variable', '/', '[^/]++', 'id'], ['text', '/api/client/get']], [], []],
    'api_get_client_param' => [[], ['_controller' => 'App\\Controller\\APIController::clientByParam'], [], [['text', '/api/client/param']], [], []],
    'api_delete_client_id' => [['id'], ['_controller' => 'App\\Controller\\APIController::clientDelete'], [], [['variable', '/', '[^/]++', 'id'], ['text', '/api/client/delete']], [], []],
    'api_create_client' => [[], ['_controller' => 'App\\Controller\\APIController::createClient'], [], [['text', '/api/client/create']], [], []],
    'client' => [[], ['_controller' => 'App\\Controller\\ClientController::index'], [], [['text', '/client']], [], []],
    'client_delete' => [[], ['_controller' => 'App\\Controller\\ClientController::clientDelete'], [], [['text', '/client_delete']], [], []],
    'commande' => [[], ['_controller' => 'App\\Controller\\CommandeController::index'], [], [['text', '/commande']], [], []],
    'login' => [[], ['_controller' => 'App\\Controller\\LoginController::index'], [], [['text', '/login']], [], []],
    'parametre' => [[], ['_controller' => 'App\\Controller\\ParametreController::index'], [], [['text', '/parametre']], [], []],
    'stock' => [[], ['_controller' => 'App\\Controller\\StockController::index'], [], [['text', '/stock']], [], []],
    'index' => [[], ['_controller' => 'App\\Controller\\ClientController::index'], [], [['text', '/']], [], []],
];

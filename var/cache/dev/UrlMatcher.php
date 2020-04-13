<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/api/client' => [[['_route' => 'api_create_client', '_controller' => 'App\\Controller\\APIController::createClient'], null, ['POST' => 0], null, false, false, null]],
        '/api/clients' => [[['_route' => 'api_get_clients', '_controller' => 'App\\Controller\\APIController::listeClients'], null, ['GET' => 0], null, false, false, null]],
        '/api/stocks' => [[['_route' => 'api_get_stock', '_controller' => 'App\\Controller\\APIController::findStock'], null, ['GET' => 0], null, false, false, null]],
        '/client' => [[['_route' => 'client', '_controller' => 'App\\Controller\\ClientController::index'], null, null, null, false, false, null]],
        '/client_delete' => [[['_route' => 'client_delete', '_controller' => 'App\\Controller\\ClientController::clientDelete'], null, null, null, false, false, null]],
        '/commande' => [[['_route' => 'commande', '_controller' => 'App\\Controller\\CommandeController::index'], null, null, null, false, false, null]],
        '/login' => [[['_route' => 'login', '_controller' => 'App\\Controller\\LoginController::index'], null, null, null, false, false, null]],
        '/parametre' => [[['_route' => 'parametre', '_controller' => 'App\\Controller\\ParametreController::index'], null, null, null, false, false, null]],
        '/stock' => [[['_route' => 'stock', '_controller' => 'App\\Controller\\StockController::index'], null, null, null, false, false, null]],
        '/api/doc' => [[['_route' => 'app.swagger_ui', '_controller' => 'nelmio_api_doc.controller.swagger_ui'], null, ['GET' => 0], null, false, false, null]],
        '/' => [[['_route' => 'index', '_controller' => 'App\\Controller\\ClientController::index'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:38)'
                    .'|wdt/([^/]++)(*:57)'
                    .'|profiler/([^/]++)(?'
                        .'|/(?'
                            .'|search/results(*:102)'
                            .'|router(*:116)'
                            .'|exception(?'
                                .'|(*:136)'
                                .'|\\.css(*:149)'
                            .')'
                        .')'
                        .'|(*:159)'
                    .')'
                .')'
                .'|/api/(?'
                    .'|client/(?'
                        .'|([^/]++)(?'
                            .'|(*:198)'
                        .')'
                        .'|delete/([^/]++)(*:222)'
                        .'|([^/]++)/(?'
                            .'|correction(?'
                                .'|(*:255)'
                                .'|s(*:264)'
                            .')'
                            .'|verres(?'
                                .'|(*:282)'
                                .'|/([^/]++)(*:299)'
                            .')'
                            .'|montures(*:316)'
                        .')'
                    .')'
                    .'|stock/([^/]++)(?'
                        .'|(*:343)'
                    .')'
                .')'
            .')/?$}sD',
    ],
    [ // $dynamicRoutes
        38 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        57 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        102 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        116 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        136 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        149 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        159 => [[['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null]],
        198 => [
            [['_route' => 'api_get_client_id', '_controller' => 'App\\Controller\\APIController::clientById'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => 'api_update_client_id', '_controller' => 'App\\Controller\\APIController::updateClient'], ['id'], ['PUT' => 0], null, false, true, null],
        ],
        222 => [[['_route' => 'api_delete_client_id', '_controller' => 'App\\Controller\\APIController::clientDelete'], ['id'], ['DELETE' => 0], null, false, true, null]],
        255 => [[['_route' => 'api_create_client_correction', '_controller' => 'App\\Controller\\APIController::createCorrection'], ['id'], ['POST' => 0], null, false, false, null]],
        264 => [[['_route' => 'api_get_client_id_correction', '_controller' => 'App\\Controller\\APIController::correctionByClientID'], ['id'], ['GET' => 0], null, false, false, null]],
        282 => [[['_route' => 'api_get_client_id_verres', '_controller' => 'App\\Controller\\APIController::verresByClientID'], ['id'], ['GET' => 0], null, false, false, null]],
        299 => [[['_route' => 'api_update_verres', '_controller' => 'App\\Controller\\APIController::updateVerresClient'], ['cId', 'vId'], ['PUT' => 0], null, false, true, null]],
        316 => [[['_route' => 'api_get_client_id_montures', '_controller' => 'App\\Controller\\APIController::monturesByClientID'], ['id'], ['GET' => 0], null, false, false, null]],
        343 => [
            [['_route' => 'api_get_stock_monture', '_controller' => 'App\\Controller\\APIController::findMontureInStock'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => 'api_update_stock', '_controller' => 'App\\Controller\\APIController::updateStock'], ['id'], ['PUT' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];

<?php
// src/Controller/StockController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class StockController
{
    public function index(Environment $twig)
    {
        $content = $twig->render('Stock/index.html.twig', ['name' => 'stock']);

        return new Response($content);
    }
}
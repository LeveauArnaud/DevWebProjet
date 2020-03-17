<?php
// src/Controller/CommandesController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class CommandesController
{
    public function index(Environment $twig)
    {
        $content = $twig->render('Commandes/index.html.twig', ['name' => 'commandes']);

        return new Response($content);
    }
}
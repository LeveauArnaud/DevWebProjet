<?php
// src/Controller/ClientController.php

namespace App\Controller;

use App\Entity\Client;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class ClientController
{
    public function index(Environment $twig)
    {
        $content = $twig->render('Client/index.html.twig', ['name' => 'client']);

        return new Response($content);
    }

    

}
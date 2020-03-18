<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Client;

class ClientController extends AbstractController
{
    /**
     * @Route("/client", name="client")
     */
    public function index()
    {
        $repo = $this->getDoctrine()->getRepository(Client::class);

        $clients = $repo->findAll();

        return $this->render('client/index.html.twig', [
            'controller_name' => 'ClientController', 'clients' => $clients,
        ]);
    }
}

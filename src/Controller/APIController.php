<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ClientRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use App\Entity\Client;

/**
 * @Route("/api", name="api_")
 */
class APIController extends AbstractController
{

    public function toJson($entite){

        // On spécifie qu'on utilise l'encodeur JSON
        $encoders = [new JsonEncoder()];

        // On instancie le "normaliseur" pour convertir la collection en tableau
        $normalizers = [new ObjectNormalizer()];

        // On instancie le convertisseur
        $serializer = new Serializer($normalizers, $encoders);

        // On convertit en json
        $jsonContent = $serializer->serialize($entite, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        // On instancie la réponse
        $response = new Response($jsonContent);

        // On ajoute l'entête HTTP
        $response->headers->set('Content-Type', 'application/json');

        // On envoie la réponse
        return $response;
    }

    /**
     * @Route("/client/liste", name="get_client_liste", methods={"GET"})
     */
    public function liste(ClientRepository $clientsRepo)
    {
        // On récupère la liste des articles
        $clients = $clientsRepo->findAll();

        $response = $this->toJson($clients);
        return $response;

    }



    /**
     * @Route("/client/{id}", name="get_client_id", methods={"GET"})
     */
    public function clientById($id)
    {
        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        $response = $this->toJson($client);
        return $response;


    }

    /**
     * @Route("/client/param", name="get_client_param", methods={"GET"})
     */
    public function clientByParam()
    {
        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->findBy([
                "prenom" => $prenom,
                "nom" => $nom,
            ]);

        if (!$client) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        $response = $this->toJson($client);
        return $response;


    }


    /**
     * @Route("/client/delete/{id}", name="delete_client_id")
     */
    public function clientDelete($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        $entityManager->remove($client);
        $entityManager->flush();

        return $this->redirectToRoute('client_delete' );
    }
}

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
     * @Route("/client/get/{id}", name="get_client_id", methods={"GET"})
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

        //mémorise les infos pour message de confirmation
        $entityManager->persist($client);
        //prépare la requête remove
        $entityManager->remove($client);
        //execute la requête
        $entityManager->flush();

        /*return $this->render('client/clientDelete.html.twig', [
            'message' => 'le client portant le nom '.$client->getNom().' '.$client->getPrenom().' à bien été supprimé'
        ]);*/
        return new Response('le client portant le nom '.$client->getNom().' '.$client->getPrenom().' à bien été supprimé');
    }

    /**
     * @Route("/client/create", name="create_client")
     */

    public function createProduct(): Response
    {

        $entityManager = $this->getDoctrine()->getManager();

        $client = new Client();
        $client->setNom("Famille")
            ->setPrenom("prenom")
            ->setSexe("M")
            ->setDateNaissance(new \DateTime())
            ->setRue("Rue de l'église 2")
            ->setVille("Villes")
            ->setPays("Pays")
            ->setEmail("email")
            ->setPhoto("https://placeholder.com/150");

        //mémorise les infos pour message de confirmation
        $entityManager->persist($client);

        //execute la requête)
        $entityManager->flush();

        return new Response('Nouveau client avec l\'id '.$client->getId());
    }

}

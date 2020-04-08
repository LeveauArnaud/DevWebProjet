<?php

namespace App\Controller;

use App\Entity\Correction;
use App\Entity\Monture;
use App\Entity\Stock;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ClientRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use Swagger\Annotations as SWG;
use App\Entity\Client;

/**
 * @Route("/api", name="api_")
 */
class APIController extends AbstractController
{

    /*
     * fonction commune
     */

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


    /*
     * Client
     */


    /**
     * @SWG\Tag(name="Client")
     * Ajoute un nouveau client
     * @Route("/client", name="create_client", methods={"POST"})
     * @SWG\Response(
     *     response=200,
     *     description="le client à bien été  ajouté",
     * )
     */
    public function createClient(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager)
    {
        // Convertir le format JSON
        $client = $serializer->deserialize($request->getContent(), Client::class, 'json');
        // Sauvegarde pour utilisation
        $entityManager->persist($client);
        // Envoie vers la DB
        $entityManager->flush();
        $data = [
            'status' => 201,
            'message' => 'Le client '.$client->getNom().' '.$client->getPrenom().' a bien été ajouté avec l id '.$client->getId()
        ];
        return new JsonResponse($data, 201);
    }

    /**
     * @SWG\Tag(name="Client")
     * Retrourne une liste des clients avec leurs infos de base : id, sexe, nom, prenom, date de naissance, adresse, téléphone, email, photo. Trié par orde croissant sur le nom.
     * @Route("/clients", name="get_clients", methods={"GET"})
     * @SWG\Response(
     *     response=200,
     *     description="retrourne une liste des clients avec leurs infos de base : id, sexe, nom, prenom, date de naissance, adresse, téléphone, email, photo",
     * )
     *@SWG\Response(
     *     response=404,
     *     description="Pas de client"
     * )
     */

    public function liste(ClientRepository $clientsRepo)
    {
        // Récupère la liste des articles
        $clients = $clientsRepo->apiFindMinInfosAll();
        // Converti au format JSON
        $response = $this->toJson($clients);
        return $response;

    }



    /**
     * @SWG\Tag(name="Client")
     * Retrourne infos d'un client en fonction de son id : infos personnelles, corrections, commandes verres et montures
     * @Route("/client/{id}", name="get_client_id", methods={"GET"})
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="integer",
     *     description="l'id du client"
     * )
     * @SWG\Response(
     *     response=200,
     *     description="retrourne infos d'un client en fonction de son id : infos personnelles, corrections, commandes verres et montures"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de client avec cet id"
     * )
     */

    public function clientById($id)
    {
        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'Pas de client trouvé avec l\'id '.$id
            );
        }

        $response = $this->toJson($client);
        return $response;


    }

    /**
     * @SWG\Tag(name="Client")
     * Modifie infos d'un client en fonction de son id : infos personnelles
     * @Route("/client/{id}", name="update_client_id", methods={"PUT"})
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="integer",
     *     description="l'id du client"
     * )
     * @SWG\Response(
     *     response=200,
     *     description="modifie infos d'un client en fonction de son id : infos personnelles"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de client avec cet id"
     * )
     */

    public function updateClient(Request $request, SerializerInterface $serializer, Client $client, EntityManagerInterface $entityManager)
    {
       // récupère le client avec son id
        $clientUpdate = $entityManager->getRepository(Client::class)->find($client->getId());
        // récupère les données à modifier
        $data = json_decode($request->getContent());
        foreach ($data as $key => $value){
            if($key && !empty($value)) {
                $nom = ucfirst($key);
                $setter = 'set'.$nom;
                $clientUpdate->$setter($value);
            }
        }
        // Envoie les nouvelles données
        $entityManager->flush();
        $data = [
            'status' => 200,
            'message' => 'Le client a bien été mis à jour'
        ];
        return new JsonResponse($data);
    }

    /**
     * @SWG\Tag(name="Client")
     * Supprime un client en fonction de son id à condition qu'il n'ai plus de commande en cours !
     * @Route("/client/delete/{id}", name="delete_client_id", methods={"DELETE"})
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="integer",
     *     description="l'id du client"
     * )
     * @SWG\Response(
     *     response=200,
     *     description="le client à bien été supprimé"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de client avec cet id"
     * )
     */

    public function clientDelete($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'Pas de client trouvé avec l\'id '.$id
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
        $data = [
            'status' => 201,
            'message' => 'Le client '.$client->getNom().' '.$client->getPrenom().' avec l id'.$client->getId().' a bien été supprimé '
        ];
        return new JsonResponse($data, 201);
    }

    /*
    * Correction client
    * */

    /**
     * @SWG\Tag(name="Correction")
     * Ajoute une nouvelle correction
     * @Route("/client/{id}/correction", name="create_client_correction", methods={"POST"})
     * @SWG\Response(
     *     response=200,
     *     description="la correction à bien été  ajouté",
     * )
     */
    public function createCorrection(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, $id)
    {
        $eM = $this->getDoctrine()->getManager();
        $client = $eM->getRepository(Client::class)->find($id);

        // Convertir le format JSON
        $correction = $serializer->deserialize($request->getContent(), Correction::class, 'json');
        // Envoie vers la DB
        $entityManager->flush();
        $data = [
            'status' => 201,
            'message' => 'La correction à bien été ajouté au client '.$client->getnom()
        ];
        return new JsonResponse($data, 201);
    }


    /**
     * @SWG\Tag(name="Correction")
     * Retrourne les corrections d'un client en fonction de son id
     * @Route("/client/{id}/corrections", name="get_client_id_correction", methods={"GET"})
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="integer",
     *     description="l'id du client"
     * )
     * @SWG\Response(
     *     response=200,
     *     description="retrourne les corrections d'un client en fonction de son id"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de correction pour le client avec cet id"
     * )
     */

    public function correctionByClientID($id)
    {
        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'Pas de client trouvé avec l\'id '.$id
            );
        }

        $correctionList = $client->getCorrections();


        $response = $this->toJson($correctionList);
        return $response;


    }


    /*
         * Commandes verres et montures
         */
    /**
     * @SWG\Tag(name="Commandes")
     * Retrourne les verres d'un client en fonction de son id
     * @Route("/client/{id}/verres", name="get_client_id_verres", methods={"GET"})
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="integer",
     *     description="l'id du client"
     * )
     * @SWG\Response(
     *     response=200,
     *     description="retrourne les verres d'un client en fonction de son id"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de verres pour le client avec cet id"
     * )
     */

    public function verresByClientID($id)
    {
        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'Pas de client trouvé avec l\'id '.$id
            );
        }

        $correctionList = $client->getCommandeVerres();


        $response = $this->toJson($correctionList);
        return $response;


    }

    /**
     * @SWG\Tag(name="Commandes")
     * Retrourne les montures d'un client en fonction de son id
     * @Route("/client/{id}/montures", name="get_client_id_montures", methods={"GET"})
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="integer",
     *     description="l'id du client"
     * )
     * @SWG\Response(
     *     response=200,
     *     description="retrourne les montures d'un client en fonction de son id"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de montures pour le client avec cet id"
     * )
     */

    public function monturesByClientID($id)
    {
        $client = $this->getDoctrine()
            ->getRepository(Client::class)
            ->find($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'Pas de client trouvé avec l\'id '.$id
            );
        }

        $correctionList = $client->getCommandeMontures();


        $response = $this->toJson($correctionList);
        return $response;


    }

    /*
     * Stock
     */

    /**
     * @SWG\Tag(name="Stoc")
     * Retrourne la liste des montures en stock
     * @Route("/stock", name="get_stock", methods={"GET"})
     * @SWG\Response(
     *     response=200,
     *     description="Retrourne la liste des montures en stock"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de monture en stock"
     * )
     */

    public function findStock()
    {
        $stock = $this->getDoctrine()
            ->getRepository(Stock::class)
            ->findAll();

        if (!$stock) {
            throw $this->createNotFoundException(
                'Pas de monture dans le stock'
            );
        }

        $response = $this->toJson($stock);
        return $response;


    }

    /**
     * @SWG\Tag(name="Stock")
     * Retrourne infos monture en stock avec l'id
     * @Route("/stock/{id}", name="get_stock", methods={"GET"})
     * @SWG\Response(
     *     response=200,
     *     description="Retrourne infos monture en stock avec l'id "
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Cette monture n'est pas dans le stock"
     * )
     */

    public function findMontureInStock(Stock $stock)
    {
        $montureStock = $this->getDoctrine()
            ->getRepository(Stock::class)
            ->find($stock->getId());

        if (!$montureStock) {
            throw $this->createNotFoundException(
                'Cette monture n\'est pas dans le stock'
            );
        }

        $response = $this->toJson($montureStock);
        return $response;


    }

    /**
     * @SWG\Tag(name="Stock")
     * Modifie la qunatité dans le stock
     * @Route("/stock/{id}", name="update_stock", methods={"PUT"})
     * @SWG\Response(
     *     response=200,
     *     description="Modifie la qunatité dans le stock"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de monture en stock"
     * )
     */

    public function updateStock(Request $request, SerializerInterface $serializer, Stock $stock,  EntityManagerInterface $entityManager)
    {
        $stockUpdate = $entityManager->getRepository(Stock::class)->find($stock->getId());
        $data = json_decode($request->getContent());
        foreach ($data as $key => $value){
            if($key && !empty($value)) {
                $name = ucfirst($key);
                $setter = 'set'.$name;
                $stockUpdate->$setter($value);
            }
        }

        $entityManager->flush();
        $data = [
            'status' => 200,
            'message' => 'Le stock a bien été mis à jour'
        ];
        return new JsonResponse($data);
    }

    /**
     * @SWG\Tag(name="Stock")
     * Ajoute monture dans le Stock
     * @Route("/stock", name="update_stock", methods={"POST"})
     * @SWG\Response(
     *     response=200,
     *     description="Ajoute monture dans le Stock"
     * )
     * @SWG\Response(
     *     response=404,
     *     description="Pas de monture en stock"
     * )
     */

    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager)
    {
        $stock = $serializer->deserialize($request->getContent(), stock::class, 'json');

        $entityManager->persist($stock);
        $entityManager->flush();
        $data = [
            'status' => 201,
            'message' => 'Le téléphone a bien été ajouté'
        ];
        return new JsonResponse($data, 201);
    }

}

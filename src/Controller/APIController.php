<?php

namespace App\Controller;

use App\Entity\Correction;
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
    * Commande client
    * */

    /**
     * @SWG\Tag(name="Commande")
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
        // Sauvegarde pour utilisation
        $entityManager->persist($correction);
        // Envoie vers la DB
        $entityManager->flush();
        $data = [
            'status' => 201,
            'message' => 'La correction à bien été ajouté au client '.$client->getnom()
        ];
        return new JsonResponse($data, 201);
    }

    /**
     * @SWG\Tag(name="Commande")
     * Retrourne les corrections d'un client en fonction de son id
     * @Route("/client/{id}/correction", name="get_client_id_correction", methods={"GET"})
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

    public function clientByIdCorrection($id)
    {
        $client = $this->getDoctrine()
            ->getRepository(Correction::class)
            ->findClient($id);

        if (!$client) {
            throw $this->createNotFoundException(
                'Pas de client trouvé avec l\'id '.$id
            );
        }

        $response = $this->toJson($client);
        return $response;


    }
    /*
     * Stock
     */



}

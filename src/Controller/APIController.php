<?php

namespace App\Controller;

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
     * @SWG\Response(
     *     response=200,
     *     description="retrourne une liste des utilisateurs",
     * )
     *
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

    public function clientByParam(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager)
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
        $data = [
            'status' => 201,
            'message' => $response
        ];
        return new JsonResponse($data, 201);


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
        $data = [
            'status' => 201,
            'message' => 'Le client '.$client->getNom().' '.$client->getPrenom().' avec l id'.$client->getId().' a bien été supprimé '
        ];
        return new JsonResponse($data, 201);
    }


    /**
     * @Route("/client/create", name="create_client", methods={"POST"})
     */
    public function createClient(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager)
    {
        $client = $serializer->deserialize($request->getContent(), Client::class, 'json');
        $entityManager->persist($client);
        $entityManager->flush();
        $data = [
            'status' => 201,
            'message' => 'Le client '.$client->getNom().' '.$client->getPrenom().' a bien été ajouté avec l id '.$client->getId()
        ];
        return new JsonResponse($data, 201);
    }
}

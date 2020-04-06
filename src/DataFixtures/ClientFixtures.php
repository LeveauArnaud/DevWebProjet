<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Client;

class ClientFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for($i = 1; $i<= 10; $i++){
            $client = new Client();
            $client->setNom("Famille$i")
                    ->setPrenom("prenom$i")
                    ->setSexe("M")
                    ->setDateNaissance(new \DateTime())
                    ->setRue("Rue de l'église 2$i")
                    ->setVille("Villes$i")
                    ->setPays("Pays$i")
                    ->setEmail("email$i")
                    ->setPhoto("https://via.placeholder.com/150");

            $manager->persist($client);

        }

        $manager->flush();
    }
}

<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\CommandeMonture;
use App\Entity\CommandeVerre;
use App\Entity\Correction;
use App\Entity\Customer;
use App\Entity\EtatCommande;
use App\Entity\Invoice;
use App\Entity\Magasin;
use App\Entity\Monture;
use App\Entity\Prescripteur;
use App\Entity\Stock;
use App\Entity\User;
use App\Entity\Verres;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    /**
     * Encoder de mots de passe
     *
     * @var UserPasswordEncoderInterface
     */

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder=$encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_BE');


        for($u =0; $u < 10; $u++){
            $user = new User();

            $hash = $this->encoder->encodePassword($user,"password");

            $user->setUsername($faker->firstName)
                ->setPassword($hash);

            $manager->persist($user);
        }

        for($p = 0; $p < 3; $p++){
            $prescripteur = new Prescripteur();
            $prescripteur->setNom($faker->lastName);

            $manager->persist($prescripteur);
        }

        for($m = 0; $m < 3; $m++){
            $magasinNom=["Mons","Maisières","LaLouvière"];
            $magasin = new Magasin();
            $magasin->setNom($magasinNom[$m]);

            $manager->persist($magasin);
        }

        for($s = 0; $s < 3; $s++){
            $etatListe=["En traitement","En commande","Terminé"];
            $etat= new EtatCommande();
            $etat->setNom($etatListe[$s]);

            $manager->persist($etat);
        }

        for($v = 0; $v < 5; $v++){
            $verres= new Verres();
            $verres->setMarque("Marque-".$v)
                   ->setType("Type-".$v);

            $manager->persist($verres);
        }

        for($m = 0; $m < 30; $m++){
            $monture= new Monture();
            $monture->setMarque("Marque-".$m)
                    ->setModel("Model-".$m)
                    ->setCouleur($faker->colorName)
                    ->setTaille($faker->randomNumber(3))
                    ->setPrix($faker->randomNumber(3));

            $manager->persist($monture);

            $stock= new Stock();
            $stock->setIdMonture($monture)
                ->setIdMagasin($magasin)
                ->setQuantite($faker->randomNumber(2));

            $manager->persist($stock);
        }


        for($c = 0; $c < 20; $c++){
            $customer = new Client();
            $customer->setPrenom($faker->firstName)
                     ->setNom($faker->lastName)
                     ->setDateNaissance($faker->dateTime)
                     ->setRue($faker->streetAddress)
                     ->setVille($faker->city)
                     ->setPays($faker->country)
                     ->setEmail($faker->email)
                     ->setSexe($faker->randomElement(['F','M']))
                     ->setPhoto("https://via.placeholder.com/150")
                     ->setCodePostale($faker->randomNumber(4))
                     ->setPhone($faker->randomNumber(9))
                     ->setNCli($faker->randomNumber(4));

            $manager->persist($customer);

            for($co = 0; $co < mt_rand(1,3); $co++){
                $correction = new Correction();
                $correction->setDate($faker->dateTimeBetween('-3 months'))
                            ->setIdPrescripteur($prescripteur)
                            ->setDatePrescription($faker->dateTimeBetween('-8 months'))
                            ->setCommentaire($faker->text)
                            ->setIdClient($customer)
                            ->setSphOdL($faker->randomNumber(3))
                            ->setCylOdL($faker->randomNumber(3))
                            ->setAxOdL($faker->randomNumber(3))
                            ->setPdOdL($faker->randomNumber(3))
                            ->setAddOd($faker->randomNumber(3))
                            ->setAddLOd($faker->randomNumber(3))
                            ->setSphOdP($faker->randomNumber(3))
                            ->setCylOdP($faker->randomNumber(3))
                            ->setAxOdP($faker->randomNumber(3))
                            ->setPdOdP($faker->randomNumber(3))
                            ->setSphOgL($faker->randomNumber(3))
                            ->setCylOgL($faker->randomNumber(3))
                            ->setAxOgL($faker->randomNumber(3))
                            ->setPdOgL($faker->randomNumber(3))
                            ->setAddOg($faker->randomNumber(3))
                            ->setAddLOg($faker->randomNumber(3))
                            ->setSphOgP($faker->randomNumber(3))
                            ->setCylOgP($faker->randomNumber(3))
                            ->setAxOgP($faker->randomNumber(3))
                            ->setPdOgP($faker->randomNumber(3));

                $manager->persist($correction);
            }

            for($co = 0; $co < mt_rand(1,3); $co++){
                $coMonture= new CommandeMonture();
                $coMonture->setIdClient($customer)
                    ->setIdMonture($monture)
                    ->setEtat($etat)
                    ->setDate($faker->dateTimeBetween('-2 months'))
                    ->setCommentaire($faker->text(100));

                $manager->persist($coMonture);
            }

            for($co = 0; $co < mt_rand(1,3); $co++){
                $coVerres= new CommandeVerre();
                $coVerres->setIdClient($customer)
                    ->setIdVerre($verres)
                    ->setEtat($etat)
                    ->setDiamD($faker->randomFloat(1,0))
                    ->setDiamG($faker->randomFloat(1,0))
                    ->setSupp1($faker->realText(50))
                    ->setSupp2($faker->realText(50))
                    ->setSupp3($faker->realText(50))
                    ->setSupp4($faker->realText(50))
                    ->setDate($faker->dateTimeBetween('-2 months'))
                    ->setPrixOD($faker->randomNumber(3))
                    ->setPrixOG($faker->randomNumber(3))
                    ->setPrixSupp1($faker->randomNumber(2))
                    ->setPrixSupp2($faker->randomNumber(3))
                    ->setPrixSupp3($faker->randomNumber(3))
                    ->setPrixSupp4($faker->randomNumber(3))
                    ->setCommentaire($faker->text(100));

                $manager->persist($coVerres);

            }



        }

        $manager->flush();
    }
}

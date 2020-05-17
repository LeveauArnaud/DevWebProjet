<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EtatCommandeRepository")
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"etat_read"}
 *     }
 * )
 */
class EtatCommande
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"etat_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"etat_read"})
     */
    private $nom;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }
}

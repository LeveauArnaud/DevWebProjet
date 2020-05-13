<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PrescripteurRepository")
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"prescripteurs_read"}
 *     }
 * )
 */
class Prescripteur
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"corrections_read","corrections_subresource","clients_read","prescripteurs_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"corrections_read","corrections_subresource","clients_read","prescripteurs_read"})
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

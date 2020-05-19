<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\VerresRepository")
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"verres_read"}
 *     }
 * )
 */
class Verres
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"commandeVerres_read","clients_read","commandeVerres_subresource","verres_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"commandeVerres_read","clients_read","commandeVerres_subresource","verres_read"})
     */
    private $marque;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"commandeVerres_read","clients_read","commandeVerres_subresource","verres_read"})
     */
    private $type;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): self
    {
        $this->marque = $marque;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }
}

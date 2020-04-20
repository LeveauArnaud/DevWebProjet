<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PrescripteurRepository")
 * @ApiResource(
 *     subresourceOperations={
 *          "api_clients_prescripteur_get_subresource"={
 *                  "normalization_context"={"groups"={"prescripteur_subresource"}}
 *          }
 *     },
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
     * @groups({"prescripteurs_read","corrections_read","prescripteur_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"prescripteurs_read","corrections_read","prescripteur_subresource"})
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

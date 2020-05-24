<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommandeMontureRepository")
 *  @ApiResource(
 *     subresourceOperations={
 *          "api_clients_commandeMonture_get_subresource"={
 *                  "normalization_context"={"groups"={"commandeMonture_subresource"}}
 *          }
 *     },
 *     normalizationContext={
 *          "groups"={"commandeMonture_read"}
 *     }
 * )
 */
class CommandeMonture
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"commandeMonture_read","commandeMonture_subresource","clients_read","monture_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @groups({"commandeMonture_read","commandeMonture_subresource","clients_read"})
     * @Assert\NotBlank(message="la commande doit avoir une date !")
     */
    private $date;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @groups({"commandeMonture_read","commandeMonture_subresource","clients_read"})
     */
    private $commentaire;


    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="commandeMontures")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"commandeMonture_read"})
     * @Assert\NotBlank(message="la commande doit être associée à un client !")
     */
    private $idClient;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Monture")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"commandeMonture_read","commandeMonture_subresource","clients_read"})
     * @Assert\NotBlank(message="la commande doit avoir une monture !")
     */
    private $idMonture;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\EtatCommande")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"commandeMonture_read","commandeMonture_subresource","clients_read"})
     * @Assert\NotBlank(message="la commande doit avoir un état !")
     */
    private $etat;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @groups({"commandeMonture_read","commandeMonture_subresource","clients_read"})
     */
    private $reduction;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getCommentaire(): ?string
    {
        return $this->commentaire;
    }

    public function setCommentaire(?string $commentaire): self
    {
        $this->commentaire = $commentaire;

        return $this;
    }


    public function getIdClient(): ?Client
    {
        return $this->idClient;
    }

    public function setIdClient(?Client $idClient): self
    {
        $this->idClient = $idClient;

        return $this;
    }

    public function getIdMonture(): ?Monture
    {
        return $this->idMonture;
    }

    public function setIdMonture(?Monture $idMonture): self
    {
        $this->idMonture = $idMonture;

        return $this;
    }

    public function getEtat(): ?EtatCommande
    {
        return $this->etat;
    }

    public function setEtat(?EtatCommande $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getReduction(): ?float
    {
        return $this->reduction;
    }

    public function setReduction(?float $reduction): self
    {
        $this->reduction = $reduction;

        return $this;
    }
}

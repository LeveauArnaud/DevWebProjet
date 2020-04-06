<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommandeMontureRepository")
 */
class CommandeMonture
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $commentaire;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $etat;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="commandeMontures")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idClient;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Monture")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idMonture;

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

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

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
}

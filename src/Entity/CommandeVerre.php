<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommandeVerreRepository")
 */
class CommandeVerre
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
     * @ORM\Column(type="integer")
     */
    private $diamD;

    /**
     * @ORM\Column(type="integer")
     */
    private $diamG;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $supp1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $supp2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $supp3;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $supp4;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixOD;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixOG;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixSupp1;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixSupp2;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixSupp3;

    /**
     * @ORM\Column(type="integer")
     */
    private $prixSupp4;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $commentaire;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="commandeVerres")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idClient;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Verres")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idVerre;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\EtatCommande")
     * @ORM\JoinColumn(nullable=false)
     */
    private $etat;

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

    public function getDiamD(): ?int
    {
        return $this->diamD;
    }

    public function setDiamD(int $diamD): self
    {
        $this->diamD = $diamD;

        return $this;
    }

    public function getDiamG(): ?int
    {
        return $this->diamG;
    }

    public function setDiamG(int $diamG): self
    {
        $this->diamG = $diamG;

        return $this;
    }

    public function getSupp1(): ?string
    {
        return $this->supp1;
    }

    public function setSupp1(?string $supp1): self
    {
        $this->supp1 = $supp1;

        return $this;
    }

    public function getSupp2(): ?string
    {
        return $this->supp2;
    }

    public function setSupp2(?string $supp2): self
    {
        $this->supp2 = $supp2;

        return $this;
    }

    public function getSupp3(): ?string
    {
        return $this->supp3;
    }

    public function setSupp3(?string $supp3): self
    {
        $this->supp3 = $supp3;

        return $this;
    }

    public function getSupp4(): ?string
    {
        return $this->supp4;
    }

    public function setSupp4(?string $supp4): self
    {
        $this->supp4 = $supp4;

        return $this;
    }

    public function getPrixOD(): ?int
    {
        return $this->prixOD;
    }

    public function setPrixOD(int $prixOD): self
    {
        $this->prixOD = $prixOD;

        return $this;
    }

    public function getPrixOG(): ?int
    {
        return $this->prixOG;
    }

    public function setPrixOG(int $prixOG): self
    {
        $this->prixOG = $prixOG;

        return $this;
    }

    public function getPrixSupp1(): ?int
    {
        return $this->prixSupp1;
    }

    public function setPrixSupp1(int $prixSupp1): self
    {
        $this->prixSupp1 = $prixSupp1;

        return $this;
    }

    public function getPrixSupp2(): ?int
    {
        return $this->prixSupp2;
    }

    public function setPrixSupp2(int $prixSupp2): self
    {
        $this->prixSupp2 = $prixSupp2;

        return $this;
    }

    public function getPrixSupp3(): ?int
    {
        return $this->prixSupp3;
    }

    public function setPrixSupp3(int $prixSupp3): self
    {
        $this->prixSupp3 = $prixSupp3;

        return $this;
    }

    public function getPrixSupp4(): ?int
    {
        return $this->prixSupp4;
    }

    public function setPrixSupp4(int $prixSupp4): self
    {
        $this->prixSupp4 = $prixSupp4;

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

    public function getIdVerre(): ?Verres
    {
        return $this->idVerre;
    }

    public function setIdVerre(?Verres $idVerre): self
    {
        $this->idVerre = $idVerre;

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
}

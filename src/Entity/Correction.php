<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CorrectionRepository")
 */
class Correction
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
     * @ORM\Column(type="date")
     */
    private $datePrescription;

    /**
     * @ORM\Column(type="text")
     */
    private $oD = [];

    /**
     * @ORM\Column(type="text")
     */
    private $oG = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $commentaire;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="corrections")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idClient;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Prescripteur")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idPrescripteur;

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

    public function getDatePrescription(): ?\DateTimeInterface
    {
        return $this->datePrescription;
    }

    public function setDatePrescription(\DateTimeInterface $datePrescription): self
    {
        $this->datePrescription = $datePrescription;

        return $this;
    }

    public function getOD(): ?string
    {
        return $this->oD;
    }

    public function setOD(?string $oD): self
    {
        $this->oD = $oD;

        return $this;
    }

    public function getOG(): ?string
    {
        return $this->oG;
    }

    public function setOG(string $oG): self
    {
        $this->oG = $oG;

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

    public function getIdPrescripteur(): ?Prescripteur
    {
        return $this->idPrescripteur;
    }

    public function setIdPrescripteur(?Prescripteur $idPrescripteur): self
    {
        $this->idPrescripteur = $idPrescripteur;

        return $this;
    }
}

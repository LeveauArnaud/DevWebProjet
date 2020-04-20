<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CorrectionRepository")
 * @ApiResource(
 *     subresourceOperations={
 *          "api_clients_corrections_get_subresource"={
 *                  "normalization_context"={"groups"={"corrections_subresource"}}
 *          }
 *     },
 *     normalizationContext={
 *          "groups"={"corrections_read"}
 *     }
 * )
 */
class Correction
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $date;

    /**
     * @ORM\Column(type="date")
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $datePrescription;

    /**
     * @ORM\Column(type="text")
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $oD = [];

    /**
     * @ORM\Column(type="text")
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $oG = [];

    /**
     * @ORM\Column(type="text", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $commentaire;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Prescripteur")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"corrections_read","corrections_subresource","clients_read",})
     */
    private $idPrescripteur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="corrections")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"corrections_read"})
     */
    private $idClient;


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

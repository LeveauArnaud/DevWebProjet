<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

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
     * @Assert\NotBlank(message="la correction doit avoir une date de création")
     */
    private $date;

    /**
     * @ORM\Column(type="date")
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     * @Assert\NotBlank(message="la correction doit avoir une date de prescription")
     */
    private $datePrescription;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $commentaire;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Prescripteur")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     * @Assert\NotBlank(message="la correction doit avoir un prescripteur")
     */
    private $idPrescripteur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="corrections")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idClient;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $sphOdL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $cylOdL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $axOdL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $pdOdL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $addOd;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $addLOd;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $sphOdP;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $cylOdP;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $axOdP;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $pdOdP;


    //

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $sphOgL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $cylOgL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $axOgL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $pdOgL;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $addOg;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $addLOg;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $sphOgP;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $cylOgP;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $axOgP;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"corrections_read","corrections_subresource","clients_read"})
     */
    private $pdOgP;


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

    public function getSphOdL(): ?int
    {
        return $this->sphOdL;
    }

    public function setSphOdL(?int $sphOdL): self
    {
        $this->sphOdL = $sphOdL;

        return $this;
    }

    public function getCylOdL(): ?int
    {
        return $this->cylOdL;
    }

    public function setCylOdL(?int $cylOdL): self
    {
        $this->cylOdL = $cylOdL;

        return $this;
    }

    public function getAxOdL(): ?int
    {
        return $this->axOdL;
    }

    public function setAxOdL(?int $axOdL): self
    {
        $this->axOdL = $axOdL;

        return $this;
    }

    public function getPdOdL(): ?int
    {
        return $this->pdOdL;
    }

    public function setPdOdL(?int $pdOdL): self
    {
        $this->pdOdL = $pdOdL;

        return $this;
    }

    public function getAddOd(): ?int
    {
        return $this->addOd;
    }

    public function setAddOd(?int $addOd): self
    {
        $this->addOd = $addOd;

        return $this;
    }

    public function getAddLOd(): ?int
    {
        return $this->addLOd;
    }

    public function setAddLOd(?int $addLOd): self
    {
        $this->addLOd = $addLOd;

        return $this;
    }

    public function getSphOdP(): ?int
    {
        return $this->sphOdP;
    }

    public function setSphOdP(?int $sphOdP): self
    {
        $this->sphOdP = $sphOdP;

        return $this;
    }

    public function getCylOdP(): ?int
    {
        return $this->cylOdP;
    }

    public function setCylOdP(?int $cylOdP): self
    {
        $this->cylOdP = $cylOdP;

        return $this;
    }

    public function getAxOdP(): ?int
    {
        return $this->axOdP;
    }

    public function setAxOdP(?int $axOdP): self
    {
        $this->axOdP = $axOdP;

        return $this;
    }

    public function getPdOdP(): ?int
    {
        return $this->pdOdP;
    }

    public function setPdOdP(?int $pdOdP): self
    {
        $this->pdOdP = $pdOdP;

        return $this;
    }

    //
    public function getSphOgL(): ?int
    {
        return $this->sphOgL;
    }

    public function setSphOgL(?int $sphOgL): self
    {
        $this->sphOgL = $sphOgL;

        return $this;
    }

    public function getCylOgL(): ?int
    {
        return $this->cylOgL;
    }

    public function setCylOgL(?int $cylOgL): self
    {
        $this->cylOgL = $cylOgL;

        return $this;
    }

    public function getAxOgL(): ?int
    {
        return $this->axOgL;
    }

    public function setAxOgL(?int $axOgL): self
    {
        $this->axOgL = $axOgL;

        return $this;
    }

    public function getPdOgL(): ?int
    {
        return $this->pdOgL;
    }

    public function setPdOgL(?int $pdOgL): self
    {
        $this->pdOgL = $pdOgL;

        return $this;
    }

    public function getAddOg(): ?int
    {
        return $this->addOg;
    }

    public function setAddOg(?int $addOg): self
    {
        $this->addOg = $addOg;

        return $this;
    }

    public function getAddLOg(): ?int
    {
        return $this->addLOg;
    }

    public function setAddLOg(?int $addLOg): self
    {
        $this->addLOg = $addLOg;

        return $this;
    }

    public function getSphOgP(): ?int
    {
        return $this->sphOgP;
    }

    public function setSphOgP(?int $sphOgP): self
    {
        $this->sphOgP = $sphOgP;

        return $this;
    }

    public function getCylOgP(): ?int
    {
        return $this->cylOgP;
    }

    public function setCylOgP(?int $cylOgP): self
    {
        $this->cylOgP = $cylOgP;

        return $this;
    }

    public function getAxOgP(): ?int
    {
        return $this->axOgP;
    }

    public function setAxOgP(?int $axOgP): self
    {
        $this->axOgP = $axOgP;

        return $this;
    }

    public function getPdOgP(): ?int
    {
        return $this->pdOgP;
    }

    public function setPdOgP(?int $pdOgP): self
    {
        $this->pdOgP = $pdOgP;

        return $this;
    }
}

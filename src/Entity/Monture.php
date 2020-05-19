<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MontureRepository")
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"monture_read"}
 *     })
 */
class Monture
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"monture_read","stock_read","clients_read","commandeMonture_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"monture_read","stock_read","clients_read","commandeMonture_read"})
     */
    private $marque;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"monture_read","stock_read","clients_read","commandeMonture_read"})
     */
    private $model;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"monture_read","stock_read","clients_read","commandeMonture_read"})
     */
    private $couleur;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"monture_read","stock_read","clients_read","commandeMonture_read"})
     */
    private $taille;

    /**
     * @ORM\Column(type="integer")
     * @groups({"monture_read","stock_read","clients_read","commandeMonture_read"})
     */
    private $prix;

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

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function getCouleur(): ?string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): self
    {
        $this->couleur = $couleur;

        return $this;
    }

    public function getTaille(): ?string
    {
        return $this->taille;
    }

    public function setTaille(string $taille): self
    {
        $this->taille = $taille;

        return $this;
    }

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): self
    {
        $this->prix = $prix;

        return $this;
    }
}

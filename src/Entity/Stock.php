<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StockRepository")
 */
class Stock
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $quantitÃe;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Monture")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idMonture;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Magasin")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idMagasin;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantitÃe(): ?int
    {
        return $this->quantitÃe;
    }

    public function setQuantitÃe(int $quantitÃe): self
    {
        $this->quantitÃe = $quantitÃe;

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

    public function getIdMagasin(): ?Magasin
    {
        return $this->idMagasin;
    }

    public function setIdMagasin(?Magasin $idMagasin): self
    {
        $this->idMagasin = $idMagasin;

        return $this;
    }
}

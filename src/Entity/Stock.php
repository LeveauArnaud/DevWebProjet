<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StockRepository")
 * @ApiResource(
 *     normalizationContext={
 *          "groups"={"stock_read"}
 *     })
 */
class Stock
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"stock_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @groups({"stock_read"})
     */
    private $quantite;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Monture")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"stock_read"})
     */
    private $idMonture;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Magasin")
     * @ORM\JoinColumn(nullable=false)
     * @groups({"stock_read"})
     */
    private $idMagasin;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): self
    {
        $this->quantite = $quantite;

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

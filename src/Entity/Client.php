<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClientRepository")
 * @ApiResource(
 *     subresourceOperations={
 *          "commandeMonture_get_subresource"={"path"="/clients/{id}/montures"},
 *          "commandeVerres_get_subresource"={"path"="/clients/{id}/verres"},
 *          "corrections_get_subresource"={"path"="/clients/{id}/corrections"}
 *     },
 *     normalizationContext={
 *          "groups"={"clients_read"}
 *     },
 *     attributes={
 *          "pagination_enabled"=true,
 *          "pagination_items_per_page"= 5
 *
 *     },)
 */
class Client
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255 )
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="Le nom du client est obligatoire")
     * @Assert\Length(min=3, minMessage="Le nom du client doit faire entre 3 et 255 caractères",
     *                max=255, maxMessage="Le nom du client doit faire entre 3 et 255 caractères")
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="Le prenom du client est obligatoire")
     * @Assert\Length(min=3, minMessage="Le prenom du client doit faire entre 3 et 255 caractères",
     *                max=255, maxMessage="Le prenom du client doit faire entre 3 et 255 caractères")
     */
    private $prenom;

    /**
     * @ORM\Column(type="date")
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="le client doit avoir une date de naissance")
     *
     */
    private $dateNaissance;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="le client doit avoir une rue")
     * @Assert\Length(min=3, minMessage="La rue du client doit faire entre 3 et 255 caractères",
     *                max=255, maxMessage="La rue du client doit faire entre 3 et 255 caractères")
     */
    private $rue;

    /**
     * @ORM\Column(type="string", length=255)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="le client doit avoir une ville")
     * @Assert\Length(min=3, minMessage="La ville du client doit faire entre 3 et 255 caractères",
     *               max=255, maxMessage="La ville du client doit faire entre 3 et 255 caractères")
     */
    private $ville;

    /**
     * @ORM\Column(type="string", length=100)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="le client doit avoir un pays")
     * @Assert\Length(min=3, minMessage="Le nom du client doit faire entre 3 et 255 caractères",
     *               max=255, maxMessage="Le nom du client doit faire entre 3 et 255 caractères")
     */
    private $pays;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\Email(message = "l'adresse email '{{ value }}' n'est pas une adresse email valide."
     * )
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=1)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="le client doit avoir un sexe")
     * @Assert\Choice(choices={"F","M"}, message="le sexe doit être soit  M ou F")
     */

    private $sexe;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     */
    private $photo;

    /**
     * @ORM\Column(type="integer", length=4)
     * @groups({"clients_read","commandeMonture_read","commandeVerres_read","corrections_read"})
     * @Assert\NotBlank(message="le client doit avoir un code postal")
     * @Assert\Length(min=4, minMessage="Le code postal du client doit faire entre 3 et 6 caractères",
     *               max=6, maxMessage="Le code postal du client doit faire entre 3 et 6 caractères")
     */
    private $codePostale;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Correction", mappedBy="idClient")
     * @groups({"clients_read","prescripteurs_read"})
     * @ApiSubresource
     */
    private $corrections;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CommandeMonture", mappedBy="idClient", orphanRemoval=true)
     * @groups({"clients_read"})
     * @ApiSubresource
     */
    private $commandeMontures;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CommandeVerre", mappedBy="idClient", orphanRemoval=true)
     * @groups({"clients_read"})
     * @ApiSubresource
     */
    private $commandeVerres;


    public function __construct()
    {
        $this->corrections = new ArrayCollection();
        $this->commandeMontures = new ArrayCollection();
        $this->commandeVerres = new ArrayCollection();
    }

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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(\DateTimeInterface $dateNaissance): self
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(string $rue): self
    {
        $this->rue = $rue;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(string $pays): self
    {
        $this->pays = $pays;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): self
    {
        $this->sexe = $sexe;

        return $this;
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setPhoto($photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getCodePostale(): ?int
    {
        return $this->codePostale;
    }

    public function setCodePostale(int $codePostale): self
    {
        $this->codePostale = $codePostale;

        return $this;
    }

    /**
     * @return Collection|Correction[]
     */
    public function getCorrections(): Collection
    {
        return $this->corrections;
    }

    public function addCorrection(Correction $correction): self
    {
        if (!$this->corrections->contains($correction)) {
            $this->corrections[] = $correction;
            $correction->setIdClient($this);
        }

        return $this;
    }

    public function removeCorrection(Correction $correction): self
    {
        if ($this->corrections->contains($correction)) {
            $this->corrections->removeElement($correction);
            // set the owning side to null (unless already changed)
            if ($correction->getIdClient() === $this) {
                $correction->setIdClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CommandeMonture[]
     */
    public function getCommandeMontures(): Collection
    {
        return $this->commandeMontures;
    }

    public function addCommandeMonture(CommandeMonture $commandeMonture): self
    {
        if (!$this->commandeMontures->contains($commandeMonture)) {
            $this->commandeMontures[] = $commandeMonture;
            $commandeMonture->setIdClient($this);
        }

        return $this;
    }

    public function removeCommandeMonture(CommandeMonture $commandeMonture): self
    {
        if ($this->commandeMontures->contains($commandeMonture)) {
            $this->commandeMontures->removeElement($commandeMonture);
            // set the owning side to null (unless already changed)
            if ($commandeMonture->getIdClient() === $this) {
                $commandeMonture->setIdClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CommandeVerre[]
     */
    public function getCommandeVerres(): Collection
    {
        return $this->commandeVerres;
    }

    public function addCommandeVerre(CommandeVerre $commandeVerre): self
    {
        if (!$this->commandeVerres->contains($commandeVerre)) {
            $this->commandeVerres[] = $commandeVerre;
            $commandeVerre->setIdClient($this);
        }

        return $this;
    }

    public function removeCommandeVerre(CommandeVerre $commandeVerre): self
    {
        if ($this->commandeVerres->contains($commandeVerre)) {
            $this->commandeVerres->removeElement($commandeVerre);
            // set the owning side to null (unless already changed)
            if ($commandeVerre->getIdClient() === $this) {
                $commandeVerre->setIdClient(null);
            }
        }

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(?int $phone): self
    {
        $this->phone = $phone;

        return $this;
    }
}

<?php

namespace App\Repository;

use App\Entity\CommandeVerre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method CommandeVerre|null find($id, $lockMode = null, $lockVersion = null)
 * @method CommandeVerre|null findOneBy(array $criteria, array $orderBy = null)
 * @method CommandeVerre[]    findAll()
 * @method CommandeVerre[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommandeVerreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CommandeVerre::class);
    }

    /**
     * @return array
     */
    public function findClient($id): array
    {
        $qb = $this->createQueryBuilder('c')
            ->where('c.idClient='.$id);

        $query = $qb ->getQuery();
        return $query->execute();
    }

    // /**
    //  * @return CommandeVerre[] Returns an array of CommandeVerre objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CommandeVerre
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

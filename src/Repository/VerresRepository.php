<?php

namespace App\Repository;

use App\Entity\Verres;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Verres|null find($id, $lockMode = null, $lockVersion = null)
 * @method Verres|null findOneBy(array $criteria, array $orderBy = null)
 * @method Verres[]    findAll()
 * @method Verres[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VerresRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Verres::class);
    }

    // /**
    //  * @return Verres[] Returns an array of Verres objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Verres
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

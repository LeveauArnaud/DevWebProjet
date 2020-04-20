<?php

namespace App\Repository;

use App\Entity\CommandeMonture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method CommandeMonture|null find($id, $lockMode = null, $lockVersion = null)
 * @method CommandeMonture|null findOneBy(array $criteria, array $orderBy = null)
 * @method CommandeMonture[]    findAll()
 * @method CommandeMonture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommandeMontureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CommandeMonture::class);
    }

    // /**
    //  * @return CommandeMonture[] Returns an array of CommandeMonture objects
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
    public function findOneBySomeField($value): ?CommandeMonture
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

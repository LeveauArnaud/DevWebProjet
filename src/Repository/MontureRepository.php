<?php

namespace App\Repository;

use App\Entity\Monture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Monture|null find($id, $lockMode = null, $lockVersion = null)
 * @method Monture|null findOneBy(array $criteria, array $orderBy = null)
 * @method Monture[]    findAll()
 * @method Monture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MontureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Monture::class);
    }
    /**
     * @return array
     */
    public function findInStock(): array
    {
        $qb = $this->createQueryBuilder('m')
            ->orderBy('m.marque', 'ASC');

        $query = $qb ->getQuery();
        return $query->execute();
    }


    // /**
    //  * @return Monture[] Returns an array of Monture objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Monture
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

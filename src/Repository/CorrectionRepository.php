<?php

namespace App\Repository;

use App\Entity\Correction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Correction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Correction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Correction[]    findAll()
 * @method Correction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CorrectionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Correction::class);
    }

    /**
     * @return array
     */
    public function findClient($id): array
    {
        $qb = $this->createQueryBuilder('c')
            //->select('c.id', 'c.date', 'c.datePrescription', 'c.oD', 'c.oG', 'c.commentaire', "c.idPrescripteur")
            ->where('c.idClient='.$id);

        $query = $qb ->getQuery();
        return $query->execute();
    }

    // /**
    //  * @return Correction[] Returns an array of Correction objects
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
    public function findOneBySomeField($value): ?Correction
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

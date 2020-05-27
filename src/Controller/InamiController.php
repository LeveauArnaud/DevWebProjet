<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

// Include Dompdf required namespaces
use Dompdf\Dompdf;
use Dompdf\Options;

class InamiController extends AbstractController
{
    /**
     * @Route("/inami", name="inami")
     */
    public function index()
      {



      return $this->render('app/print/inami.html.twig', []);



      }

}
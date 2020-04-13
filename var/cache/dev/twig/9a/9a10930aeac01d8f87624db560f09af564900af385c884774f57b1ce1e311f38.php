<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* stock/index.html.twig */
class __TwigTemplate_789c5ab8e654173c55c44e4888b0426644496a55e5f43d30d25d48225e9c3a7e extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'title' => [$this, 'block_title'],
            'body' => [$this, 'block_body'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "stock/index.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "stock/index.html.twig"));

        $this->parent = $this->loadTemplate("base.html.twig", "stock/index.html.twig", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    // line 3
    public function block_title($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "title"));

        echo "Hello StockController!";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 5
    public function block_body($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "body"));

        // line 6
        echo "    <h1>Partie Stock</h1>
    <div class=\"container\">
        <div class=\"row\">
            <div class=\"col-sm-4 mb-3\">
                <button type=\"button\" class=\"btn btn-primary\">Ajouter une monture</button>
            </div>
        </div>
        <div class=\"row\">
            <div class=\"col-sm-12 mb-3\">
                <table class=\"table table-hover\">
                    <thead>
                    <tr>
                        <th scope=\"col\">Id</th>
                        <th scope=\"col\">Magasin</th>
                        <th scope=\"col\">Produits</th>
                        <th scope=\"col\">Marque</th>
                        <th scope=\"col\">Model</th>
                        <th scope=\"col\">Couleur</th>
                        <th scope=\"col\">Taille</th>
                        <th scope=\"col\">Prix</th>
                        <th scope=\"col\">Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    public function getTemplateName()
    {
        return "stock/index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  88 => 6,  78 => 5,  59 => 3,  36 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Hello StockController!{% endblock %}

{% block body %}
    <h1>Partie Stock</h1>
    <div class=\"container\">
        <div class=\"row\">
            <div class=\"col-sm-4 mb-3\">
                <button type=\"button\" class=\"btn btn-primary\">Ajouter une monture</button>
            </div>
        </div>
        <div class=\"row\">
            <div class=\"col-sm-12 mb-3\">
                <table class=\"table table-hover\">
                    <thead>
                    <tr>
                        <th scope=\"col\">Id</th>
                        <th scope=\"col\">Magasin</th>
                        <th scope=\"col\">Produits</th>
                        <th scope=\"col\">Marque</th>
                        <th scope=\"col\">Model</th>
                        <th scope=\"col\">Couleur</th>
                        <th scope=\"col\">Taille</th>
                        <th scope=\"col\">Prix</th>
                        <th scope=\"col\">Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    <tr>
                        <th scope=\"row\">Default</th>
                        <td>###</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>Column content</td>
                        <td>000.00 €</td>
                        <td>Column content</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{% endblock %}
", "stock/index.html.twig", "/Applications/MAMP/htdocs/DevWebProjet/templates/stock/index.html.twig");
    }
}

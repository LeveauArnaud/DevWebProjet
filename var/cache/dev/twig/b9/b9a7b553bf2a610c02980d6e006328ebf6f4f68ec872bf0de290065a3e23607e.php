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

/* client/index.html.twig */
class __TwigTemplate_9e5044eb59fbaa09225cfb3e5398c57e7fcd88c5fe259888cf38757f26b619d0 extends \Twig\Template
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
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "client/index.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "client/index.html.twig"));

        $this->parent = $this->loadTemplate("base.html.twig", "client/index.html.twig", 1);
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

        echo "Hello ClientController!";
        
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
        echo "    <nav class=\"navbar navbar-expand-lg navbar-dark bg-primary\">
        <div class=\"collapse navbar-collapse\" id=\"navbarColor01\">
            <ul class=\"navbar-nav mr-auto\">
                <li class=\"nav-item\">
                    <a class=\"dropdown-item\" href=\"#\">Recherche client</a>
                </li>
                <li class=\"nav-item\">
                    <a class=\"dropdown-item\" href=\"#\">Nouveau client</a>
                </li>
            </ul>
        </div>
    </nav>
<h1>Partie Client</h1>
    <div class=\"container\">
        <div class=\"row\">
            <div class=\"col-sm-4 bg-danger mb-3\">
                <h4>Liste des clients</h4>
    ";
        // line 23
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["clients"]) || array_key_exists("clients", $context) ? $context["clients"] : (function () { throw new RuntimeError('Variable "clients" does not exist.', 23, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["client"]) {
            // line 24
            echo "        <div class=\"card text-white bg-danger mb-3\">
            <div class=\"card-Header\">
                <img src=\"";
            // line 26
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "photo", [], "any", false, false, false, 26), "html", null, true);
            echo "\" alt=\"photo du client\">
            </div>
            <div class=\"card-body\">
                <p>Sexe : ";
            // line 29
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "sexe", [], "any", false, false, false, 29), "html", null, true);
            echo "</p>
                <p>Nom : ";
            // line 30
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "nom", [], "any", false, false, false, 30), "html", null, true);
            echo "</p>
                <p>Prenom : ";
            // line 31
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "prenom", [], "any", false, false, false, 31), "html", null, true);
            echo "</p>
                <p>Date de naissance : ";
            // line 32
            echo twig_escape_filter($this->env, twig_date_format_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "dateNaissance", [], "any", false, false, false, 32), "d/m/Y"), "html", null, true);
            echo "</p>
                <p>Rue : ";
            // line 33
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "rue", [], "any", false, false, false, 33), "html", null, true);
            echo "</p>
                <p>Ville : ";
            // line 34
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "ville", [], "any", false, false, false, 34), "html", null, true);
            echo "</p>
                <p>Pays : ";
            // line 35
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "pays", [], "any", false, false, false, 35), "html", null, true);
            echo "</p>
                <p>Email : ";
            // line 36
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, $context["client"], "email", [], "any", false, false, false, 36), "html", null, true);
            echo "</p>
            </div>

        </div>

    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['client'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 42
        echo "            </div>
        <div class=\"col-sm-8\">
        <div class=\"card text-white bg-success mb-3\">
            <div class=\"card-Header\">
                <h1>Espace correction</h1>
            </div>
            <div class=\"card-body\">
                <p>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
                    impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un
                    imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                    Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                    contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
                    des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte,
                    comme Aldus PageMaker.
                </p>
            </div>
        </div>
        <div class=\"card text-white bg-info mb-3\">
            <div class=\"card-Header\">
                <h1>Espace verres-montures</h1>
            </div>
            <div class=\"card-body\">
                <p>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
                    impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un
                    imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                    Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                    contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
                    des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte,
                    comme Aldus PageMaker.
                </p>
            </div>

        </div>
        </div>
        </div>
    </div>
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    public function getTemplateName()
    {
        return "client/index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  161 => 42,  149 => 36,  145 => 35,  141 => 34,  137 => 33,  133 => 32,  129 => 31,  125 => 30,  121 => 29,  115 => 26,  111 => 24,  107 => 23,  88 => 6,  78 => 5,  59 => 3,  36 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends 'base.html.twig' %}

{% block title %}Hello ClientController!{% endblock %}

{% block body %}
    <nav class=\"navbar navbar-expand-lg navbar-dark bg-primary\">
        <div class=\"collapse navbar-collapse\" id=\"navbarColor01\">
            <ul class=\"navbar-nav mr-auto\">
                <li class=\"nav-item\">
                    <a class=\"dropdown-item\" href=\"#\">Recherche client</a>
                </li>
                <li class=\"nav-item\">
                    <a class=\"dropdown-item\" href=\"#\">Nouveau client</a>
                </li>
            </ul>
        </div>
    </nav>
<h1>Partie Client</h1>
    <div class=\"container\">
        <div class=\"row\">
            <div class=\"col-sm-4 bg-danger mb-3\">
                <h4>Liste des clients</h4>
    {% for client in clients %}
        <div class=\"card text-white bg-danger mb-3\">
            <div class=\"card-Header\">
                <img src=\"{{ client.photo }}\" alt=\"photo du client\">
            </div>
            <div class=\"card-body\">
                <p>Sexe : {{ client.sexe }}</p>
                <p>Nom : {{ client.nom }}</p>
                <p>Prenom : {{ client.prenom }}</p>
                <p>Date de naissance : {{ client.dateNaissance | date('d/m/Y') }}</p>
                <p>Rue : {{ client.rue }}</p>
                <p>Ville : {{ client.ville }}</p>
                <p>Pays : {{ client.pays }}</p>
                <p>Email : {{ client.email }}</p>
            </div>

        </div>

    {% endfor %}
            </div>
        <div class=\"col-sm-8\">
        <div class=\"card text-white bg-success mb-3\">
            <div class=\"card-Header\">
                <h1>Espace correction</h1>
            </div>
            <div class=\"card-body\">
                <p>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
                    impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un
                    imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                    Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                    contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
                    des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte,
                    comme Aldus PageMaker.
                </p>
            </div>
        </div>
        <div class=\"card text-white bg-info mb-3\">
            <div class=\"card-Header\">
                <h1>Espace verres-montures</h1>
            </div>
            <div class=\"card-body\">
                <p>
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
                    impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un
                    imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                    Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son
                    contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant
                    des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte,
                    comme Aldus PageMaker.
                </p>
            </div>

        </div>
        </div>
        </div>
    </div>
{% endblock %}
", "client/index.html.twig", "/Applications/MAMP/htdocs/DevWebProjet/templates/client/index.html.twig");
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200416225218 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_906517449395C3F3');
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09A76ED395');
        $this->addSql('CREATE TABLE etat_commande (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stock (id INT AUTO_INCREMENT NOT NULL, id_monture_id INT NOT NULL, id_magasin_id INT NOT NULL, quantite INT NOT NULL, INDEX IDX_4B36566071805B6B (id_monture_id), INDEX IDX_4B3656608583EA34 (id_magasin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE monture (id INT AUTO_INCREMENT NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, couleur VARCHAR(255) NOT NULL, taille VARCHAR(255) NOT NULL, prix INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prescripteur (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE verres (id INT AUTO_INCREMENT NOT NULL, marque VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE commande_monture (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_monture_id INT NOT NULL, etat_id INT NOT NULL, date DATE NOT NULL, commentaire LONGTEXT DEFAULT NULL, INDEX IDX_C8A0E78B99DED506 (id_client_id), INDEX IDX_C8A0E78B71805B6B (id_monture_id), INDEX IDX_C8A0E78BD5E86FF (etat_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE commande_verre (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_verre_id INT NOT NULL, etat_id INT NOT NULL, date DATE NOT NULL, diam_d INT NOT NULL, diam_g INT NOT NULL, supp1 VARCHAR(255) DEFAULT NULL, supp2 VARCHAR(255) DEFAULT NULL, supp3 VARCHAR(255) DEFAULT NULL, supp4 VARCHAR(255) DEFAULT NULL, prix_od INT NOT NULL, prix_og INT NOT NULL, prix_supp1 INT NOT NULL, prix_supp2 INT NOT NULL, prix_supp3 INT NOT NULL, prix_supp4 INT NOT NULL, commentaire LONGTEXT DEFAULT NULL, INDEX IDX_F284081D99DED506 (id_client_id), INDEX IDX_F284081DD648CCDF (id_verre_id), INDEX IDX_F284081DD5E86FF (etat_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE magasin (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, date_naissance DATE NOT NULL, rue VARCHAR(255) NOT NULL, ville VARCHAR(255) NOT NULL, pays VARCHAR(100) NOT NULL, email VARCHAR(255) DEFAULT NULL, sexe VARCHAR(1) NOT NULL, photo VARCHAR(255) DEFAULT NULL, code_postale INT NOT NULL, phone INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE correction (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_prescripteur_id INT NOT NULL, date DATE NOT NULL, date_prescription DATE NOT NULL, o_d LONGTEXT NOT NULL, o_g LONGTEXT NOT NULL, commentaire LONGTEXT DEFAULT NULL, INDEX IDX_A29DA1B899DED506 (id_client_id), INDEX IDX_A29DA1B83DD825CA (id_prescripteur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B36566071805B6B FOREIGN KEY (id_monture_id) REFERENCES monture (id)');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B3656608583EA34 FOREIGN KEY (id_magasin_id) REFERENCES magasin (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78B99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78B71805B6B FOREIGN KEY (id_monture_id) REFERENCES monture (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78BD5E86FF FOREIGN KEY (etat_id) REFERENCES etat_commande (id)');
        $this->addSql('ALTER TABLE commande_verre ADD CONSTRAINT FK_F284081D99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE commande_verre ADD CONSTRAINT FK_F284081DD648CCDF FOREIGN KEY (id_verre_id) REFERENCES verres (id)');
        $this->addSql('ALTER TABLE commande_verre ADD CONSTRAINT FK_F284081DD5E86FF FOREIGN KEY (etat_id) REFERENCES etat_commande (id)');
        $this->addSql('ALTER TABLE correction ADD CONSTRAINT FK_A29DA1B899DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE correction ADD CONSTRAINT FK_A29DA1B83DD825CA FOREIGN KEY (id_prescripteur_id) REFERENCES prescripteur (id)');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE invoice');
        $this->addSql('DROP TABLE user');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_monture DROP FOREIGN KEY FK_C8A0E78BD5E86FF');
        $this->addSql('ALTER TABLE commande_verre DROP FOREIGN KEY FK_F284081DD5E86FF');
        $this->addSql('ALTER TABLE stock DROP FOREIGN KEY FK_4B36566071805B6B');
        $this->addSql('ALTER TABLE commande_monture DROP FOREIGN KEY FK_C8A0E78B71805B6B');
        $this->addSql('ALTER TABLE correction DROP FOREIGN KEY FK_A29DA1B83DD825CA');
        $this->addSql('ALTER TABLE commande_verre DROP FOREIGN KEY FK_F284081DD648CCDF');
        $this->addSql('ALTER TABLE stock DROP FOREIGN KEY FK_4B3656608583EA34');
        $this->addSql('ALTER TABLE commande_monture DROP FOREIGN KEY FK_C8A0E78B99DED506');
        $this->addSql('ALTER TABLE commande_verre DROP FOREIGN KEY FK_F284081D99DED506');
        $this->addSql('ALTER TABLE correction DROP FOREIGN KEY FK_A29DA1B899DED506');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, first_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, last_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_81398E09A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE invoice (id INT AUTO_INCREMENT NOT NULL, customer_id INT NOT NULL, amount DOUBLE PRECISION NOT NULL, sent_at DATETIME NOT NULL, status VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, chrono INT NOT NULL, INDEX IDX_906517449395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, roles JSON NOT NULL, password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, last_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, first_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_906517449395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('DROP TABLE etat_commande');
        $this->addSql('DROP TABLE stock');
        $this->addSql('DROP TABLE monture');
        $this->addSql('DROP TABLE prescripteur');
        $this->addSql('DROP TABLE verres');
        $this->addSql('DROP TABLE commande_monture');
        $this->addSql('DROP TABLE commande_verre');
        $this->addSql('DROP TABLE magasin');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE correction');
    }
}

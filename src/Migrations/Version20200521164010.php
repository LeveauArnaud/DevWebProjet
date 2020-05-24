<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200521164010 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE correction CHANGE cyl_od_l cyl_od_l DOUBLE PRECISION DEFAULT NULL, CHANGE ax_od_l ax_od_l DOUBLE PRECISION DEFAULT NULL, CHANGE pd_od_l pd_od_l DOUBLE PRECISION DEFAULT NULL, CHANGE add_od add_od DOUBLE PRECISION DEFAULT NULL, CHANGE add_lod add_lod DOUBLE PRECISION DEFAULT NULL, CHANGE sph_od_p sph_od_p DOUBLE PRECISION DEFAULT NULL, CHANGE cyl_od_p cyl_od_p DOUBLE PRECISION DEFAULT NULL, CHANGE ax_od_p ax_od_p DOUBLE PRECISION DEFAULT NULL, CHANGE pd_od_p pd_od_p DOUBLE PRECISION DEFAULT NULL, CHANGE sph_og_l sph_og_l DOUBLE PRECISION DEFAULT NULL, CHANGE cyl_og_l cyl_og_l DOUBLE PRECISION DEFAULT NULL, CHANGE ax_og_l ax_og_l DOUBLE PRECISION DEFAULT NULL, CHANGE pd_og_l pd_og_l DOUBLE PRECISION DEFAULT NULL, CHANGE add_og add_og DOUBLE PRECISION DEFAULT NULL, CHANGE add_log add_log DOUBLE PRECISION DEFAULT NULL, CHANGE sph_og_p sph_og_p DOUBLE PRECISION DEFAULT NULL, CHANGE cyl_og_p cyl_og_p DOUBLE PRECISION DEFAULT NULL, CHANGE ax_og_p ax_og_p DOUBLE PRECISION DEFAULT NULL, CHANGE pd_og_p pd_og_p DOUBLE PRECISION DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE correction CHANGE cyl_od_l cyl_od_l INT DEFAULT NULL, CHANGE ax_od_l ax_od_l INT DEFAULT NULL, CHANGE pd_od_l pd_od_l INT DEFAULT NULL, CHANGE add_od add_od INT DEFAULT NULL, CHANGE add_lod add_lod INT DEFAULT NULL, CHANGE sph_od_p sph_od_p INT DEFAULT NULL, CHANGE cyl_od_p cyl_od_p INT DEFAULT NULL, CHANGE ax_od_p ax_od_p INT DEFAULT NULL, CHANGE pd_od_p pd_od_p INT DEFAULT NULL, CHANGE sph_og_l sph_og_l INT DEFAULT NULL, CHANGE cyl_og_l cyl_og_l INT DEFAULT NULL, CHANGE ax_og_l ax_og_l INT DEFAULT NULL, CHANGE pd_og_l pd_og_l INT DEFAULT NULL, CHANGE add_og add_og INT DEFAULT NULL, CHANGE add_log add_log INT DEFAULT NULL, CHANGE sph_og_p sph_og_p INT DEFAULT NULL, CHANGE cyl_og_p cyl_og_p INT DEFAULT NULL, CHANGE ax_og_p ax_og_p INT DEFAULT NULL, CHANGE pd_og_p pd_og_p INT DEFAULT NULL');
    }
}

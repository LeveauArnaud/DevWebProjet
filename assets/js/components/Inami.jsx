import React, {useRef,useEffect} from "react";
import ReactToPrint from 'react-to-print';
import {Link} from "react-router-dom";

class ComponentToPrint extends React.Component {
    render(){

        const moment = require('moment');
        moment().format();

        function dateFormat(date){
            return moment(date).format('DD/MM/YYYY');
        }



        return (
            <div>
                <div id="p1" className="p1">


                    <div id="t1_1" className="t s1_1">Annexe 15 - recto</div>
                    <div id="t2_1" className="t s2_1">Compléter ou apposer une vignette de l’O.A.</div>
                    <div id="t3_1" className="t s3_1">Nom et prénom du patient: <b>{this.props.nom}</b></div>
                    <div id="t4_1" className="t s3_1">Organisme assureur:</div>
                    <div id="t5_1" className="t s3_1">NISS:</div>
                    <div id="t6_1" className="t s3_1">Adresse du patient: <b>{this.props.adresse}</b></div>
                    <div id="t7_1" className="t s1_1">ATTESTATION DE FOURNITURES DESTINEE AUX OPTICIENS</div>
                    <div id="t8_1" className="t s1_1">A compléter par le dispensateur agréé</div>
                    <div id="t9_1" className="t s3_1">Nom et prénom du patient: <b>{this.props.nom}</b></div>
                    <div id="ta_1" className="t s3_1">Date de naissance du patient: <b>{this.props.dateNaissance}</b></div>
                    <div id="tb_1" className="t s4_1">Dénomination/</div>
                    <div id="tc_1" className="t s4_1">Quantité</div>
                    <div id="tc_11" className="t s4_1"><b>{this.props.inamiRem[0].denom}</b></div>
                    <div id="td_1" className="t s4_1">Numéro de</div>
                    <div id="te_1" className="t s4_1">nomenclature</div>
                    <div id="te_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tf_1" className="t s4_1">Oeil Droit</div>
                    <div id="tg_1" className="t s4_1">(OD) /</div>
                    <div id="th_1" className="t s4_1">Oeil Gauche</div>
                    <div id="ti_1" className="t s4_1">(OG)</div>
                    <div id="ti_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tj_1" className="t s4_1">Prix de base</div>
                    <div id="tj_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tk_1" className="t s4_1">Réduction</div>
                    <div id="tl_1" className="t s4_1">éventuelle</div>
                    <div id="tl_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tm_1" className="t s4_1">Prix réclamé</div>
                    <div id="tm_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tn_1" className="t s4_1">Prix Nomenclature</div>
                    <div id="tn_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="to_1" className="t s4_1">Intervention OA.</div>
                    <div id="to_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tp_1" className="t s4_1">Quote-part</div>
                    <div id="tq_1" className="t s4_1">personnelle</div>
                    <div id="tq_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tr_1" className="t s4_1">Supplément pour</div>
                    <div id="ts_1" className="t s4_1">le</div>
                    <div id="tt_1" className="t s4_1">patient</div>
                    <div id="tt_11" className="t s4_1"><b>{this.props.inamiCode}</b></div>
                    <div id="tu_1" className="t s4_1">Montant total</div>
                    <div id="tv_1" className="t s4_1">(1)</div>
                    <div id="tw_1" className="t s4_1">(2)</div>
                    <div id="tx_1" className="t s5_1">Montant total à charge du patient (1)+(2)</div>
                    <div id="ty_1" className="t s6_1">:………………</div>
                    <div id="tz_1" className="t s5_1">Date de délivrance :</div>
                    <div id="t10_1" className="t s5_1">......</div>
                    <div id="t11_1" className="t s5_1">/</div>
                    <div id="t12_1" className="t s5_1">......</div>
                    <div id="t13_1" className="t s5_1">/</div>
                    <div id="t14_1" className="t s5_1">............</div>




                </div>
                <div id="p2" className="p2">

                    <div id="t1_2" className="t s1">Annexe 15 - Verso</div>
                    <div id="t2_2" className="t s2">Prescrit par : <b> {this.props.prescripteur}</b></div>
                    <div id="t3_2" className="t s2">En date du : <b>{this.props.datePrescription}</b></div>
                    <div id="t9_2" className="t s2">Numéro</div>
                    <div id="ta_2" className="t s3">d’identifi</div>
                    <div id="tb_2" className="t s2">cation I.N.A.M.I du prescripteur</div>
                    <div id="tc_2" className="t s1">A compléter par le patient ou son représentant légal (entourer
                        ce qui convient)
                    </div>
                    <div id="td_2" className="t s2">- Je certifie avoir reçu la(les) prestation(s) mentionnée(s) au
                        recto de cette attestation
                    </div>
                    <div id="te_2" className="t s2">OUI / NON</div>
                    <div id="tf_2" className="t s2">- Je certifie avoir été clairement informé(e) par le
                        dispensateur agréé des coûts
                    </div>
                    <div id="tg_2" className="t s1">mentionnés au recto de cette attestation</div>
                    <div id="th_2" className="t s2">(montant total,</div>
                    <div id="ti_2" className="t s3">intervention de l’organisme assureur et partie entièrement</div>
                    <div id="tj_2" className="t s2">à ma charge)</div>
                    <div id="tk_2" className="t s2">............................</div>
                    <div id="tl_2" className="t s2">OUI / NON</div>
                    <div id="tm_2" className="t s2">- Je certifie avoir été suffisamment informé(e) sur la
                        possibilité de recevoir des verres de bonne qualité optique au tarif du remboursement .. OUI
                        / NON
                    </div>
                    <div id="tn_2" className="t s2">Date:</div>
                    <div id="to_2" className="t s2">.....</div>
                    <div id="tp_2" className="t s2">/</div>
                    <div id="tq_2" className="t s2">.....</div>
                    <div id="tr_2" className="t s2">/</div>
                    <div id="ts_2" className="t s2">.....</div>
                    <div id="tt_2" className="t s2">Signature du patient ou de son représentant légal:</div>
                    <div id="tu_2" className="t s2">..........................................</div>
                    <div id="tv_2" className="t s1">A compléter par le dispensateur agréé</div>
                    <div id="tw_2" className="t s2">Nom et prénom du dispensateur agréé :</div>
                    <div id="tx_2" className="t s2">Numéro</div>
                    <div id="ty_2" className="t s3">d’identifi</div>
                    <div id="tz_2" className="t s2">cation INAMI :</div>
                    <div id="t10_2" className="t s3">Nom de l’entreprise</div>
                    <div id="t11_2" className="t s2">:</div>
                    <div id="t12_2" className="t s2">Rue et numéro :</div>
                    <div id="t13_2" className="t s2">Commune et code postal :</div>
                    <div id="t14_2" className="t s2">Numéro BCE:</div>
                    <div id="t15_2" className="t s2">Je confirme avoir personnellement effectivement essayé, adapté
                        et délivré la (les) prestation(s) susmentionnée(s) (3)
                    </div>
                    <div id="t16_2" className="t s2">Je confirme avoir suffisamment informé le patient</div>
                    <div id="t17_2" className="t s2">sur la possibilité de recevoir des verres de bonne qualité
                        optique au tarif du remboursement.
                    </div>
                    <div id="t18_2" className="t s3">Je confirme avoir fourni au patient un document justificatif
                        détaillé de l’achat (
                    </div>
                    <div id="t19_2" className="t s2">4)</div>
                    <div id="t1a_2" className="t s4">(3) Les mots « essayé » et « adapté » sont, dans le cas de
                        lentilles de contact, à supprimer si le dispensateur agréé
                    </div>
                    <div id="t1b_2" className="t s5">n’est pas habilité à effectuer de telles prestations et/ou si
                        le dispensateur agréé
                    </div>
                    <div id="t1c_2" className="t s4">n'a pas réalisé lui-même l'adaptation.</div>
                    <div id="t1d_2" className="t s4">(4) A supprimer si seules des prestations remboursables ont été
                        délivrées.
                    </div>
                    <div id="t1e_2" className="t s3">En cas de tiers payant, cette attestation est payable par
                        l’organisme assureur au compte
                    </div>
                    <div id="t1f_2" className="t s2">:</div>
                    <div id="t1g_2" className="t s2">IBAN</div>
                    <div id="t1h_2" className="t s3">………………………………………………………………………………………..</div>
                    <div id="t1i_2" className="t s2">BIC</div>
                    <div id="t1j_2" className="t s3">………………………………………………………………………………………….</div>
                    <div id="t1k_2" className="t s2">Date et signature du dispensateur agréé:</div>
                    <div id="t1l_2" className="t s1">RECU</div>
                    <div id="t1m_2" className="t s2">Perçu pour le compte du n° BCE :</div>
                    <div id="t1n_2" className="t s2">..............................</div>
                    <div id="t1o_2" className="t s2">Date: {dateFormat(moment())}</div>
                    <div id="t1u_2" className="t s2">Reçu la somme de :</div>
                    <div id="t1v_2" className="t s2">.......................................</div>
                    <div id="t1w_2" className="t s2">EUR</div>
                    <div id="t1x_2" className="t s2">Signature :</div>




                </div>
            </div>
        );
    }
}


const Inami = ({nom, adresse, dateNaissance, prescripteur, datePresciption, idClient, inamiRem, correction}) => {

    const moment = require('moment');
    moment().format();

    function dateFormat(date){
        return moment(date).format('DD/MM/YYYY');
    }

    const componentRef = useRef();

    const getAge =(date) => {
        let now = moment();
        return now.diff(moment(date),"years");
    }
    //alert(getAge(new Date(1995, 12, 6))); //Date(année, mois, jour)
    const inamiRemb = [{o:"OG" ,denom:"TORIQUES CYL. 0,25 à 3,00",code:741.716,z:43}];
    console.log(correction);


    const inami = () =>{

        const age = getAge(dateNaissance);

        const sph = [correction.sphOdL , correction.sphOdP ,correction.sphOgL, correction.sphOgP];
        const cyl = [correction.cylOdL , correction.cylOdP ,correction.cylOgL, correction.cylOgP];

        if(age<18){
            sph.forEach(function(s){
                    if( 4 > s && s > 0){
                        console.log(s);
                        inamiRemb.push({o: s===(correction.sphOdL || correction.sphOdP) && "OD" || "OG" ,denom:"sphérques 0,00 à 4,00",code:741.694,z:43})
                        cyl.forEach(function(c){
                                if( 0.25 < c && c < 3){
                                    inamiRemb.push({o: s===(correction.sphOdL || correction.sphOdP) && "OD" || "OG" ,denom:"TORIQUES CYL. 0,25 à 3,00",code:741.716,z:43})
                                }else
                                if( 3.25 < c && c < 6){
                                    inamiRemb.push({o: s===(correction.sphOdL || correction.sphOdP) && "OD" || "OG" ,denom:"TORIQUES CYL. 3,25 à 6,00",code:741.731,z:60})
                                }
                            }
                        )
                    }else
                    if( 4.25 < s && s < 8){
                        console.log(s);
                        inamiRemb.push({o: s===(correction.sphOdL || correction.sphOdP) && "OD" || "OG" ,denom:"sphérques 4,25 à 8,00",code:741.753,z:109})
                        cyl.forEach(function(c){
                                if( 0.25 < c && c < 6){
                                    inamiRemb.push({o: s===(correction.sphOdL || correction.sphOdP) && "OD" || "OG" ,denom:"TORIQUES CYL. 0,25 à 6,00",code:741.775,z:109})
                                }
                            }
                        )
                    }
                }
            )



        }else if(age>65){
            return "+65 ans";
        }
        console.log(inamiRemb);
    }

    return(
        <div>
            <div className="form-group row">
                <div className="col-md-6">
                    <h1>Aperçu du document</h1>
                </div>
                <div className="col-md-6">
                    <ReactToPrint
                        trigger={() => <button type="submit" className="btn btn-success">Imprimer le document</button>}
                        content={() => componentRef.current}
                    />
                    <Link to={"/client/"+idClient} className="btn btn-link"> Retour au client</Link>
                </div>
            </div>
            <ComponentToPrint nom={nom} adresse={adresse} dateNaissance={dateNaissance} prescripteur={prescripteur} datePrescription={datePresciption} inamiRem={inamiRemb} ref={componentRef} />
        </div>
    )
}

export default Inami;
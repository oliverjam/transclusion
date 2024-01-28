import { Root, html } from "./helpers.ts";

let server = Bun.serve({
	async fetch(req) {
		let url = new URL(req.url);
		let query = url.searchParams.get("q")?.toLowerCase();
		if (req.method === "GET") {
			let title = "Delete row - transclusion examples";
			let rows = "";
			for (let u of users) {
				if (query && !match(u, query)) continue;
				rows += `<tr><td>${u.first}<td>${u.last}<td>${u.email}<td>${u.city}</tr>`;
			}
			let body = /*html*/ `
        <form data-boost data-select="tbody" data-target="tbody">
          <p>
            <input
              name="q"
              autofocus
              aria-label="Search contacts"
              placeholder="Search contacts"
              oninput="this.form.requestSubmit()"
            >
          </p>
        </form>
				<table>
					<thead><th>First<th>Last<th>Email<th>City</thead>
					<tbody>${rows}</tbody>
				</table>
			`;
			let styles = /*css*/ `
			  table { width: 100%; border-collapse: collapse; }
				th { padding: 4px; text-align: left; border-bottom: 2px solid #eee }
				td { padding: 4px; border-bottom: 1px solid #eee }
			`;
			let res = html(Root(title, body, styles));
			res.headers.append("set-cookie", `changed=`);
			return res;
		}
		return html("<h1>Not found</h1>", { status: 404 });
	},
});

let match = (o: Record<string, string>, q: string) =>
	Object.values(o).some((v) => v.toLowerCase().includes(q));

console.log(`http://localhost:${server.port}`);

let users = [
	{
		first: "Venus",
		last: "Grimes",
		email: "lectus.rutrum@Duisa.edu",
		city: "Ankara",
	},
	{ first: "Fletcher", last: "Owen", email: "metus@Aenean.org", city: "Niort" },
	{
		first: "William",
		last: "Hale",
		email: "eu.dolor@risusodio.edu",
		city: "Te Awamutu",
	},
	{
		first: "TaShya",
		last: "Cash",
		email: "tincidunt.orci.quis@nuncnullavulputate.co.uk",
		city: "Titagarh",
	},
	{
		first: "Kevyn",
		last: "Hoover",
		email: "tristique.pellentesque.tellus@Cumsociis.co.uk",
		city: "Cuenca",
	},
	{
		first: "Jakeem",
		last: "Walker",
		email: "Morbi.vehicula.Pellentesque@faucibusorci.org",
		city: "St. AndrÃ¤",
	},
	{
		first: "Malcolm",
		last: "Trujillo",
		email: "sagittis@velit.edu",
		city: "Fort Resolution",
	},
	{
		first: "Wynne",
		last: "Rice",
		email: "augue.id@felisorciadipiscing.edu",
		city: "Kinross",
	},
	{
		first: "Evangeline",
		last: "Klein",
		email: "adipiscing.lobortis@sem.org",
		city: "San Giovanni in Galdo",
	},
	{
		first: "Jennifer",
		last: "Russell",
		email: "sapien.Aenean.massa@risus.com",
		city: "Laives/Leifers",
	},
	{
		first: "Rama",
		last: "Freeman",
		email: "Proin@quamPellentesquehabitant.net",
		city: "Flin Flon",
	},
	{
		first: "Jena",
		last: "Mathis",
		email: "non.cursus.non@Phaselluselit.com",
		city: "Fort Simpson",
	},
	{
		first: "Alexandra",
		last: "Maynard",
		email: "porta.elit.a@anequeNullam.ca",
		city: "Nazilli",
	},
	{
		first: "Tallulah",
		last: "Haley",
		email: "ligula@id.net",
		city: "Bay Roberts",
	},
	{
		first: "Timon",
		last: "Small",
		email: "velit.Quisque.varius@gravidaPraesent.org",
		city: "Girona",
	},
	{
		first: "Randall",
		last: "Pena",
		email: "facilisis@Donecconsectetuer.edu",
		city: "Edam",
	},
	{
		first: "Conan",
		last: "Vaughan",
		email: "luctus.sit@Classaptenttaciti.edu",
		city: "Nadiad",
	},
	{
		first: "Dora",
		last: "Allen",
		email: "est.arcu.ac@Vestibulumante.co.uk",
		city: "Renfrew",
	},
	{
		first: "Aiko",
		last: "Little",
		email: "quam.dignissim@convallisest.net",
		city: "Delitzsch",
	},
	{
		first: "Jessamine",
		last: "Bauer",
		email: "taciti.sociosqu@nibhvulputatemauris.co.uk",
		city: "Offida",
	},
	{
		first: "Gillian",
		last: "Livingston",
		email: "justo@atiaculisquis.com",
		city: "Saskatoon",
	},
	{
		first: "Laith",
		last: "Nicholson",
		email: "elit.pellentesque.a@diam.org",
		city: "Tallahassee",
	},
	{
		first: "Paloma",
		last: "Alston",
		email: "cursus@metus.org",
		city: "Cache Creek",
	},
	{
		first: "Freya",
		last: "Dunn",
		email: "Vestibulum.accumsan@metus.co.uk",
		city: "Heist-aan-Zee",
	},
	{
		first: "Griffin",
		last: "Rice",
		email: "justo@tortordictumeu.net",
		city: "Montpelier",
	},
	{
		first: "Catherine",
		last: "West",
		email: "malesuada.augue@elementum.com",
		city: "TarnÃ³w",
	},
	{
		first: "Jena",
		last: "Chambers",
		email: "erat.Etiam.vestibulum@quamelementumat.net",
		city: "Konya",
	},
	{
		first: "Neil",
		last: "Rodriguez",
		email: "enim@facilisis.com",
		city: "KrakÃ³w",
	},
	{ first: "Freya", last: "Charles", email: "metus@nec.net", city: "Arzano" },
	{
		first: "Anastasia",
		last: "Strong",
		email: "sit@vitae.edu",
		city: "Polpenazze del Garda",
	},
	{
		first: "Bell",
		last: "Simon",
		email: "mollis.nec.cursus@disparturientmontes.ca",
		city: "Caxias do Sul",
	},
	{
		first: "Minerva",
		last: "Allison",
		email: "Donec@nequeIn.edu",
		city: "Rio de Janeiro",
	},
	{
		first: "Yoko",
		last: "Dawson",
		email: "neque.sed@semper.net",
		city: "Saint-Remy-Geest",
	},
	{ first: "Nadine", last: "Justice", email: "netus@et.edu", city: "Calgary" },
	{
		first: "Hoyt",
		last: "Rosa",
		email: "Nullam.ut.nisi@Aliquam.co.uk",
		city: "Mold",
	},
	{
		first: "Shafira",
		last: "Noel",
		email: "tincidunt.nunc@non.edu",
		city: "KitzbÃ¼hel",
	},
	{
		first: "Jin",
		last: "Nunez",
		email: "porttitor.tellus.non@venenatisamagna.net",
		city: "Dreieich",
	},
	{
		first: "Barbara",
		last: "Gay",
		email: "est.congue.a@elit.com",
		city: "Overland Park",
	},
	{
		first: "Riley",
		last: "Hammond",
		email: "tempor.diam@sodalesnisi.net",
		city: "Smoky Lake",
	},
	{
		first: "Molly",
		last: "Fulton",
		email: "semper@Naminterdumenim.net",
		city: "Montese",
	},
	{
		first: "Dexter",
		last: "Owen",
		email: "non.ante@odiosagittissemper.ca",
		city: "Bousval",
	},
	{
		first: "Kuame",
		last: "Merritt",
		email: "ornare.placerat.orci@nisinibh.ca",
		city: "Solingen",
	},
	{
		first: "Maggie",
		last: "Delgado",
		email: "Nam.ligula.elit@Cum.org",
		city: "Tredegar",
	},
	{
		first: "Hanae",
		last: "Washington",
		email: "nec.euismod@adipiscingelit.org",
		city: "Amersfoort",
	},
	{
		first: "Jonah",
		last: "Cherry",
		email: "ridiculus.mus.Proin@quispede.edu",
		city: "Acciano",
	},
	{
		first: "Cheyenne",
		last: "Munoz",
		email: "at@molestiesodalesMauris.edu",
		city: "Saint-L?onard",
	},
	{
		first: "India",
		last: "Mack",
		email: "sem.mollis@Inmi.co.uk",
		city: "Maryborough",
	},
	{
		first: "Lael",
		last: "Mcneil",
		email: "porttitor@risusDonecegestas.com",
		city: "Livorno",
	},
	{
		first: "Jillian",
		last: "Mckay",
		email: "vulputate.eu.odio@amagnaLorem.co.uk",
		city: "Salvador",
	},
	{
		first: "Shaine",
		last: "Wright",
		email: "malesuada@pharetraQuisqueac.org",
		city: "Newton Abbot",
	},
	{
		first: "Keane",
		last: "Richmond",
		email: "nostra.per.inceptos@euismodurna.org",
		city: "Canterano",
	},
	{
		first: "Samuel",
		last: "Davis",
		email: "felis@euenim.com",
		city: "Peterhead",
	},
	{
		first: "Zelenia",
		last: "Sheppard",
		email: "Quisque.nonummy@antelectusconvallis.org",
		city: "Motta Visconti",
	},
	{
		first: "Giacomo",
		last: "Cole",
		email: "aliquet.libero@urnaUttincidunt.ca",
		city: "Donnas",
	},
	{
		first: "Mason",
		last: "Hinton",
		email: "est@Nunc.co.uk",
		city: "St. Asaph",
	},
	{
		first: "Katelyn",
		last: "Koch",
		email: "velit.Aliquam@Suspendisse.edu",
		city: "Cleveland",
	},
	{
		first: "Olga",
		last: "Spencer",
		email: "faucibus@Praesenteudui.net",
		city: "KarapÄ±nar",
	},
	{
		first: "Erasmus",
		last: "Strong",
		email: "dignissim.lacus@euarcu.net",
		city: "Passau",
	},
	{
		first: "Regan",
		last: "Cline",
		email: "vitae.erat.vel@lacusEtiambibendum.co.uk",
		city: "Pergola",
	},
	{
		first: "Stone",
		last: "Holt",
		email: "eget.mollis.lectus@Aeneanegestas.ca",
		city: "Houston",
	},
	{
		first: "Deanna",
		last: "Branch",
		email: "turpis@estMauris.net",
		city: "Olcenengo",
	},
	{
		first: "Rana",
		last: "Green",
		email: "metus@conguea.edu",
		city: "Onze-Lieve-Vrouw-Lombeek",
	},
	{
		first: "Caryn",
		last: "Henson",
		email: "Donec.sollicitudin.adipiscing@sed.net",
		city: "Kington",
	},
	{ first: "Clarke", last: "Stein", email: "nec@mollis.co.uk", city: "Tenali" },
	{
		first: "Kelsie",
		last: "Porter",
		email: "Cum@gravidaAliquam.com",
		city: "Ä°skenderun",
	},
	{
		first: "Cooper",
		last: "Pugh",
		email: "Quisque.ornare.tortor@dictum.co.uk",
		city: "Delhi",
	},
	{
		first: "Paul",
		last: "Spencer",
		email: "ac@InfaucibusMorbi.com",
		city: "Biez",
	},
	{
		first: "Cassady",
		last: "Farrell",
		email: "Suspendisse.non@venenatisa.net",
		city: "New Maryland",
	},
	{
		first: "Sydnee",
		last: "Velazquez",
		email: "mollis@loremfringillaornare.com",
		city: "Strï¿½e",
	},
	{
		first: "Felix",
		last: "Boyle",
		email: "id.libero.Donec@aauctor.org",
		city: "Edinburgh",
	},
	{
		first: "Ryder",
		last: "House",
		email: "molestie@natoquepenatibus.org",
		city: "Copertino",
	},
	{
		first: "Hadley",
		last: "Holcomb",
		email: "penatibus@nisi.ca",
		city: "Avadi",
	},
	{
		first: "Marsden",
		last: "Nunez",
		email: "Nulla.eget.metus@facilisisvitaeorci.org",
		city: "New Galloway",
	},
	{
		first: "Alana",
		last: "Powell",
		email: "non.lobortis.quis@interdumfeugiatSed.net",
		city: "Pitt Meadows",
	},
	{
		first: "Dennis",
		last: "Wyatt",
		email: "Morbi.non@nibhQuisquenonummy.ca",
		city: "Wrexham",
	},
	{
		first: "Karleigh",
		last: "Walton",
		email: "nascetur.ridiculus@quamdignissimpharetra.com",
		city: "Diksmuide",
	},
	{
		first: "Brielle",
		last: "Donovan",
		email: "placerat@at.edu",
		city: "Kolmont",
	},
	{
		first: "Donna",
		last: "Dickerson",
		email: "lacus.pede.sagittis@lacusvestibulum.com",
		city: "Vallepietra",
	},
	{
		first: "Eagan",
		last: "Pate",
		email: "est.Nunc@cursusNunc.ca",
		city: "Durness",
	},
	{
		first: "Carlos",
		last: "Ramsey",
		email: "est.ac.facilisis@duinec.co.uk",
		city: "Tiruvottiyur",
	},
	{
		first: "Regan",
		last: "Murphy",
		email: "lectus.Cum@aptent.com",
		city: "Candidoni",
	},
	{
		first: "Claudia",
		last: "Spence",
		email: "Nunc.lectus.pede@aceleifend.co.uk",
		city: "Augusta",
	},
	{
		first: "Genevieve",
		last: "Parker",
		email: "ultrices@inaliquetlobortis.net",
		city: "Forbach",
	},
	{
		first: "Marshall",
		last: "Allison",
		email: "erat.semper.rutrum@odio.org",
		city: "Landau",
	},
	{
		first: "Reuben",
		last: "Davis",
		email: "Donec@auctorodio.edu",
		city: "Schï¿½nebeck",
	},
	{
		first: "Ralph",
		last: "Doyle",
		email: "pede.Suspendisse.dui@Curabitur.org",
		city: "Linkebeek",
	},
	{
		first: "Constance",
		last: "Gilliam",
		email: "mollis@Nulla.edu",
		city: "Enterprise",
	},
	{
		first: "Serina",
		last: "Jacobson",
		email: "dictum.augue@ipsum.net",
		city: "HÃ©rouville-Saint-Clair",
	},
	{
		first: "Charity",
		last: "Byrd",
		email: "convallis.ante.lectus@scelerisquemollisPhasellus.co.uk",
		city: "Brussegem",
	},
	{
		first: "Hyatt",
		last: "Bird",
		email: "enim.Nunc.ut@nonmagnaNam.com",
		city: "Gdynia",
	},
	{
		first: "Brent",
		last: "Dunn",
		email: "ac.sem@nuncid.com",
		city: "Hay-on-Wye",
	},
	{
		first: "Casey",
		last: "Bonner",
		email: "id@ornareelitelit.edu",
		city: "Kearny",
	},
	{
		first: "Hakeem",
		last: "Gill",
		email: "dis@nonummyipsumnon.org",
		city: "Portico e San Benedetto",
	},
	{
		first: "Stewart",
		last: "Meadows",
		email: "Nunc.pulvinar.arcu@convallisdolorQuisque.net",
		city: "Dignano",
	},
	{
		first: "Nomlanga",
		last: "Wooten",
		email: "inceptos@turpisegestas.ca",
		city: "Troon",
	},
	{
		first: "Sebastian",
		last: "Watts",
		email: "Sed.diam.lorem@lorem.co.uk",
		city: "Palermo",
	},
	{ first: "Chelsea", last: "Larsen", email: "ligula@Nam.net", city: "Poole" },
	{
		first: "Cameron",
		last: "Humphrey",
		email: "placerat@id.org",
		city: "Manfredonia",
	},
	{
		first: "Juliet",
		last: "Bush",
		email: "consectetuer.euismod@vitaeeratVivamus.co.uk",
		city: "Lavacherie",
	},
	{
		first: "Caryn",
		last: "Hooper",
		email: "eu.enim.Etiam@ridiculus.org",
		city: "Amelia",
	},
];

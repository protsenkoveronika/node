var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root_root1991',
  database: 'news_website'
});

/*// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool
module.exports = pool.promise();*/


connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const insertQueryForUsers = 'INSERT IGNORE  INTO users (username, email, userpassword, is_author) VALUES (?, ?, ?, ?)';
const testDataUsers = [
  ['Peter', 'admin1@example.com', 'dogs', '1'],//1
  ['Amanda', 'admin2@example.com', '4321', '1'], //2
  ['Rose', 'user1@example.com', '1111', '0'],
  ['Linda', 'user2@example.com', 'L1nd4', '0'],
  ['Mike', 'user2@example.com', 'mike22', '0'],
  ['Fill', 'admin2@example.com', 'acdc', '1'], //6
];

const insertQueryForNews = 'INSERT IGNORE INTO news (title , content , author_id, category_id) VALUES (?, ?, ?, ?)';
const testDataNews = [
  ['New Marvel Movie Breaks Box Office Records', 'The latest Marvel superhero movie has shattered box office records, grossing over $300 million in its opening weekend. Fans are thrilled with the action-packed film and critics have praised its visual effects and storyline.', '1', '1'],
  ['Tech Company IPO Soars on First Day', "A leading tech company saw its stock price soar by 50% on the first day of its initial public offering (IPO). Investors are optimistic about the company's growth prospects in the rapidly evolving tech industry.", '6', '2'],
  ['Bank Robbery Suspects Arrested After High-Speed Chase', "Police have arrested two suspects involved in a bank robbery after a dramatic high-speed chase through the city. The suspects were apprehended without incident, and no injuries were reported.", '2', '3'],
  ['Top Celebrities Attend the Cannes Film Festival', "The Cannes Film Festival has once again attracted top celebrities from around the world. This year's event showcased a variety of films, including independent movies and big-budget blockbusters. The red carpet was filled with glamorous fashion and memorable moments.", '2', '1'],
  ['Retail Giant Announces Expansion Plans', "A major retail giant has announced plans to expand its operations to 50 new locations across the country. The expansion is expected to create thousands of jobs and boost local economies.", '2', '2'],
  ['"Cybercrime Ring Busted by International Task Force', "An international task force has successfully dismantled a cybercrime ring responsible for millions of dollars in fraudulent activities. Several suspects have been arrested, and authorities are working to recover the stolen funds.", '2', '3'],
  ['New Legislation Aims to Improve Healthcare Access', "Lawmakers have introduced new legislation aimed at improving access to healthcare for underserved communities. The proposed bill includes provisions for increased funding and expanded services in rural and low-income areas.", '6', '4'],
  ['President Addresses Nation on Economic Recovery Plan', "The President addressed the nation to outline an economic recovery plan designed to boost job creation and support small businesses. The plan includes tax incentives, infrastructure investments, and workforce development programs.", '6', '4'],
  ['National Team Wins Championship After Thrilling Finale', "The national team clinched the championship title in a thrilling finale that went down to the wire. Fans celebrated as the team secured victory with a last-minute goal, marking a historic win.", '2', '5'],
  ['Star Athlete Sets New World Record in 100m Sprint', "A star athlete has set a new world record in the 100m sprint, completing the race in just 9.58 seconds. The record-breaking performance has cemented the athlete's status as one of the fastest runners in history.", '2', '5'],
  ['Breakthrough in Cancer Research Offers New Hope', "Scientists have made a significant breakthrough in cancer research, discovering a new treatment that targets cancer cells more effectively. The findings offer new hope for patients and could lead to more effective therapies.", '1', '6'],
  ['Innovative Tech Startup Launches Groundbreaking AI Product', "An innovative tech startup has launched a groundbreaking AI product that promises to revolutionize the industry. The AI system offers advanced capabilities in data analysis and automation, attracting attention from investors and tech enthusiasts alike.", '1', '6'],
  ['Supreme Court Ruling Upholds Key Civil Rights Protections', "The Supreme Court has issued a ruling that upholds key civil rights protections, ensuring continued safeguards against discrimination. The decision is hailed as a victory for civil rights advocates.", '2', '7'],
  ['Landmark Case Sets New Precedent in Privacy Law', "A landmark case has set a new precedent in privacy law, with the court ruling in favor of greater protections for individuals' personal data. The decision is expected to have far-reaching implications for privacy rights and data security.", '1', '7'],
];

const insertQueryForCategories = 'INSERT IGNORE  INTO categories (title, category_description) VALUES (?, ?)';
const testDataCategories = [
  ['Entertainment', 'Entertainment journalism covers the latest news and trends in the world of film, television, music, and celebrity culture. This category includes reviews, interviews, and behind-the-scenes stories about your favorite stars and the entertainment industry'],
  ['Business', 'Business news provides insights into the corporate world, covering everything from market trends and economic policies to company performance and investment strategies. Stay updated on the latest in finance, entrepreneurship, and corporate developments.'],
  ['Crime news', 'Crime news focuses on the reporting of criminal activities, investigations, and legal proceedings. This category includes stories about local and international crimes, law enforcement efforts, and the impact of crime on communities.'],
  ['Politics', 'Politics news delivers the latest information on government policies, political events, and the actions of elected officials. Explore in-depth analysis of legislative developments, election coverage, and political debates that shape our world.'],
  ['Sports', 'Sports news keeps you informed about the latest events, scores, and highlights from the world of sports. From major tournaments and championship victories to player profiles and team updates, this category covers all things sports-related.'],
  ['Science and Technology', 'It`s description to CatigoScience and Technology news brings you the latest advancements and discoveries in various fields of science and technology. This category includes updates on groundbreaking research, innovative tech products, and the impact of scientific developments on our daily lives'],
  ['Law', 'Law news provides coverage of legal issues, court cases, and changes in legislation. Stay informed about important legal decisions, judicial proceedings, and their implications for society and individual rights'],
];

testDataUsers.forEach(data => {
  const [username, email, userpassword] = data;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      connection.query(insertQueryForUsers, data, (err, result) => {
        if (err) throw err;
        console.log('Test data row for users inserted successfully');
      });
    } else {
      console.log('The test data row for users already exists');
    }
  });
});

testDataNews.forEach(data => {
  const [title, content, author_id, category_id] = data;
  connection.query('SELECT * FROM news WHERE title = ?', [title], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      connection.query(insertQueryForNews, data, (err, result) => {
        if (err) throw err;
        console.log('Test data row for news inserted successfully');
      });
    } else {
      console.log('The test data row for news already exists');
    }
  });
});

testDataCategories.forEach(data => {
  const [title, category_description] = data;
  connection.query('SELECT * FROM categories WHERE title = ?', [title], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      connection.query(insertQueryForCategories, data, (err, result) => {
        if (err) throw err;
        console.log('Test data row for categories inserted successfully');
      });
    } else {
      console.log('The test data row for categories already exists');
    }
  });
});

module.exports = connection;

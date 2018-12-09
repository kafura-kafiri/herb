from flask import Blueprint
from config import products
from tools import crud
from search.topic import bring_reviews, init_structure

combo = lambda x: {
    'title': 'lorem ipsum dollor hapa lut',
    'value': {
        'our': 300,
    },  # ractive converts to price
    'reviews': {
        'score': {
            'value': 4.5,
            'population': 833,
        }
    },
    'img': ['https://www.images-iherb.com/m/MLI-00952-15.jpg'],
    'save': 2,
}
projection = {
    'title': 1,
    'value.our': 1,
    'reviews.score.value': 1,
    'reviews.score.population': 1,
    'img': 1,
}

ctx = {
    'lang': {
        'exp': {
            'title': 'Expiration Date',
            'popup': '''<p>The length of time for the expiration date or &quot;best used before&quot; date depends on
                              the type of product, as well as the brand.</p>
                           <p>Perishable items (such as flax oils or certain probiotics) generally have shorter
                              expiration dates. Although our warehouse is fully air-conditioned, these more fragile
                              items are put in cold storage (freezer or refrigeration unit) for maximum freshness.</p>
                           <p>Our receiving department does its best to verify and then enter the correct expiration
                              dates for all incoming products. However, discrepancies do occur from time to time. This
                              being said, the exceptionally high turnover at iHerb ensures that our inventory is among
                              the freshest in the industry.</p>''',
        },
        'shipping_weight': {
            'title': 'Shipping Weight',
            'popup': '''The Shipping Weight includes the product, protective packaging
                           material and the actual shipping box. In addition, the Shipping Weight may be adjusted for
                           the Dimensional Weight (e.g. length, width &amp;amp; height) of a package. It is important to
                           note that certain types of products (e.g. glass containers, liquids, fragile, refrigerated or
                           ice packed) will often require protective packaging material. As such, these products will
                           reflect a higher Shipping Weight compared to the unprotected product.'''
        },
        'dimensions': {
            'title': 'Dimensions',
            'weight': 'lbs',
            'length': 'in',
            'currency': '$',
        },
        'code': {
            'pr': 'Product Code',
            'upc': 'UPC Code',
        },
        'qnt': 'Package Quantity',
        'combo':
            '''
            <div class="bundle-offer">Combo Offer!</div>
            <div class="bundle-offer-nib"></div>
            <div class="header-text">
                <span class="iherb-orange">Save $%s </span>
                when you purchase these items today
                <span class="iherb-orange">for only $%s</span>
            </div>
            '''
    }
}

pr = {
    'remedy': '',
    'countable': False,
    'sub': [],
    'title': 'chamomile from lorem ipsum dolor 3/2 off road',
    'qnt': '60 Veggie Caps',
    'combo': {
        'title': 'lorem ipsum dollor hapa lut',
        'value': {
            'our': 300,
        },  # ractive converts to price
        'reviews': {
            'score': {
                'value': 4.5,
                'population': 833,
            }
        },
        'img': ['https://www.images-iherb.com/m/MLI-00952-15.jpg'],
        'save': 2,
    },
    'dimensions': {
        'weight': {
            'shipping': .18,
            'pure': .15,
        },
        'x': 2,
        'y': 2.5,
        'z': 3.5,
    },
    'code': {
        'pr': 'THR-00287',
        'upc': '693749002871',
    },
    'value': {
        'our': 300,
        'msrp': 302
    },  # ractive converts to price
    'brand': {
        'title': 'lotus',
        'link': 'http://lotus.com',
    },
    'summary': {
        'Expiration Date': 'Feb 2019',
        'Shipping Weight': 12,
        'Product Code': 'THR-80303',
        'UPC Code': '693749803034',
        'Package Quantity': '60 Veggie Caps',
        'Dimensions': [3.4, 1.9, 1.9],
    },
    'specifications': [
        {
            'title': 'Description',
            'ul': [
                'Dietary Supplement',
                'NSF - Certified by Sport',
            ],
            'p': [
                '''The keystone of every nutritional product line is a multi-vitamin/mineral supplement. A multi-vitamin/mineral product is the starting point for every individual's supplementation needs and therefore it should contain all of the essential nutrients.''',
                '''Because of the state of the current food supply and because very few individuals eat the recommended five daily servings of fruits and vegetables, nutrition experts agree that a multi-vitamin/mineral supplement should be taken daily. Even the Journal of the American Medical Association – not usually known as a supporter of nutritional supplements – suggests that everyone should take a multi-vitamin/mineral supplement (JAMA 2002;287:3127-3129). A good multi-vitamin/mineral nutritional supplement could be considered "dietary insurance" to be certain all of the essential nutrients are being consumed on a daily basis. Even greater health benefits can be realized when a healthy diet is being eaten in addition to taking a multi-vitamin/mineral supplement.''',
                '''A joint statement issued by the American College of Sports Medicine, the Academy of Nutrition and Dietetics, and the Dietitians of Canada is particularly noteworthy for individuals involved in athletic activities: “Supplements may be required by athletes who restrict energy intakes, use severe weight loss practices, eliminate one or more food groups from their diet, or consume high-carbohydrate diets with low micronutrient density.”''',
                '''Basic Nutrients 2/Day provides a comprehensive multi-vitamin/mineral complex. Its key nutritional features include 2,000 IU of vitamin D3 and 400 mcg of vitamin K (in K1 and K2 forms) per serving, in addition to having mixed tocopherols, bioactive B-vitamins, and amino acid-chelated minerals, including calcium and magnesium – all in a two-capsule-per-day delivery system. Basic Nutrients 2/Day makes it easy for individuals to obtain foundational nutritional support.''',
                '''Basic Nutrients 2/Day is NSF Certified for Sport.''',
            ]
        },
        {
            'title': 'Suggested Use',
            'p': [
                '''Take 2 capsules daily or as recommended by your-health-care practitioner.''',
            ],
        },
        {
            'title': 'Other Ingredients',
            'p': [
                '''Hypromellose (derived from cellulose) capsule, microcrystalline cellulose, calcium laurate, silicon dioxide.''',
                '''Gamma tocopherol does not have a recognized IU equivalent.''',
            ],
        },
        {
            'title': 'Warnings',
            'p': [
                '''Tamper Evident: Use only if bottle is sealed. Store tightly sealed in a cool, dry place.''',
                '''If pregnant, consult your health-care practitioner before using this product.''',
            ],
        },
    ],
    'supplement_facts': {
        'title': 'Supplement Facts',
        'serving': [
            [
                'Serving Size',
                'Two Capsules',
            ], [
                'Serving Per Container',
                '30',
            ]
        ],
        'supplements': [
            {
                'element': 'Vitamin A (3,000 IU from Beta Carotenes and 2,000 IU as Palmitate)',
                'amo': '5,000 IU',
                'dv': '100%',
            }, {
                'element': 'Vitamin C (as Ascorbic Acid)',
                'amo': '250 mg',
                'dv': '417%',
            }, {
                'element': 'Vitamin D (as Vitamin D3)',
                'amo': '2,000 IU',
                'dv': '500%',
            }, {
                'element': 'Vitamin E (as d-Alpha Tocopheryl Acid Succinate)',
                'amo': '20 IU',
                'dv': '67%',
            }, {
                'element': 'Vitamin K (200 mcg as Vitamin K1 and 200 mcg as Vitamin K2)',
                'amo': '400 mcg',
                'dv': '500%',
            }, {
                'element': 'Thiamin (as Thiamin HCI)',
                'amo': '50 mg',
                'dv': '3,333%',
            },
        ]
    },
    'reviews': init_structure(),
    'img': [
        'https://www.images-iherb.com/y/THR-00287-6.jpg',
        'https://www.images-iherb.com/y/THR-00287-5.jpg',
    ],
    'categories': [],
}

pr['reviews']['aggregation'] = {'view': 0}

blue = Blueprint('pr', __name__, url_prefix='/pr')
crud(
    blue, products, template='product/index',
    load=lambda x: ({'pr': bring_reviews(x, 5)}, ctx),
    skeleton=pr,
    projection=combo
)
